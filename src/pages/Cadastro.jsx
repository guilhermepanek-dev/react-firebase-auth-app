// ============================================================
//  PÁGINA 1 - CADASTRO
//  Possui 5 inputs: e-mail, senha, nome, sobrenome e data de
//  nascimento. Ao clicar em "Cadastrar", cria o usuário no
//  Firebase Authentication (E-mail/senha) e grava o restante
//  dos dados no Firestore, incluindo o UID do usuário.
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export default function Cadastro() {
  const navigate = useNavigate();

  // Estados dos campos do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  // Estado de interface
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Traduz mensagens de erro do Firebase para o usuário
  function traduzirErro(code) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este e-mail já está cadastrado. Faça login ou utilize outro e-mail.';
      case 'auth/invalid-email':
        return 'E-mail inválido. Verifique o endereço digitado.';
      case 'auth/weak-password':
        return 'Senha fraca. A senha deve ter no mínimo 6 caracteres.';
      case 'auth/missing-password':
        return 'Informe uma senha com no mínimo 6 caracteres.';
      case 'auth/network-request-failed':
        return 'Falha de rede. Verifique sua conexão e a configuração do Firebase.';
      case 'auth/operation-not-allowed':
        return 'O provedor E-mail/senha não está habilitado no Firebase Authentication.';
      case 'auth/api-key-not-valid':
        return 'Firebase não configurado. Preencha o firebaseConfig em src/services/firebase.js.';
      case 'auth/configuration-not-found':
        return 'Projeto Firebase não configurado. Verifique o arquivo src/services/firebase.js.';
      default:
        return 'Erro ao cadastrar. Verifique os dados e tente novamente.';
    }
  }

  // Validação simples dos campos antes de chamar o Firebase
  function validarCampos() {
    if (!nome.trim() || !sobrenome.trim()) {
      return 'Informe seu nome e sobrenome.';
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return 'Informe um e-mail válido.';
    }
    if (senha.length < 6) {
      return 'A senha deve ter no mínimo 6 caracteres.';
    }
    if (!dataNascimento) {
      return 'Informe sua data de nascimento.';
    }
    return '';
  }

  // Submit do formulário de cadastro
  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setSucesso('');

    // 1) Validação local dos campos
    const erroValidacao = validarCampos();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setCarregando(true);
    try {
      const emailTratado = email.trim().toLowerCase();

      // Evita tentativa cega quando o e-mail já existe
      // (retorna uma mensagem amigável mais rápido)
      try {
        const metodos = await fetchSignInMethodsForEmail(auth, emailTratado);
        if (metodos.length > 0) {
          setErro('Este e-mail já está cadastrado. Faça login ou utilize outro e-mail.');
          setCarregando(false);
          return;
        }
      } catch {
        // Se a verificação falhar (ex.: Firebase não configurado),
        // segue o fluxo normal e o createUserWithEmailAndPassword
        // reportará o problema real.
      }

      // 2) Cria o usuário no Firebase Authentication (E-mail/senha)
      const credenciais = await createUserWithEmailAndPassword(
        auth,
        emailTratado,
        senha,
      );

      // 3) Pega o UID gerado pelo Authentication
      const uid = credenciais.user.uid;

      // 4) Grava o restante dos dados no Firestore,
      //    usando o UID como identificador do documento
      await setDoc(doc(db, 'usuarios', uid), {
        uid,
        nome: nome.trim(),
        sobrenome: sobrenome.trim(),
        email: emailTratado,
        dataNascimento,
        criadoEm: new Date().toISOString(),
      });

      // 5) Feedback de sucesso e redireciona para o Login
      setSucesso('Usuário cadastrado com sucesso! Redirecionando para o login...');

      setTimeout(() => {
        navigate('/login');
      }, 1800);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErro(traduzirErro(error.code));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="card-head">
        <div className="icon">🧾</div>
        <h1>Cadastro</h1>
        <p>Crie sua conta com e-mail e senha</p>
      </div>

      {/* Mensagens de feedback */}
      {erro && <div className="message error" role="alert">{erro}</div>}
      {sucesso && <div className="message success" role="status">{sucesso}</div>}

      <form className="form-grid mt-2" onSubmit={handleSubmit} noValidate>
        {/* Input 1 - E-mail */}
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        {/* Input 2 - Senha */}
        <div className="field">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Mínimo de 6 caracteres"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        {/* Inputs 3 e 4 - Nome e Sobrenome */}
        <div className="form-row">
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="given-name"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              id="sobrenome"
              type="text"
              placeholder="Seu sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              autoComplete="family-name"
              required
            />
          </div>
        </div>

        {/* Input 5 - Data de nascimento */}
        <div className="field">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            id="dataNascimento"
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        {/* Botão de cadastro */}
        <button type="submit" className="btn btn-primary" disabled={carregando}>
          {carregando && <span className="spinner" />}
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <p className="link-switch">
        Já tem uma conta? <Link to="/login">Fazer login</Link>
      </p>
    </div>
  );
}
