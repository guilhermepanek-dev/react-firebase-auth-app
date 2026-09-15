// ============================================================
//  PÁGINA 2 - LOGIN
//  Possui 2 inputs: e-mail e senha. Ao clicar em "Acessar",
//  valida os dados no Firebase Authentication. Se estiverem
//  corretos, muda para a página Principal. Caso contrário,
//  informa na tela que o usuário não está cadastrado.
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function Login() {
  const navigate = useNavigate();

  // Estados dos campos do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estado de interface
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Traduz mensagens de erro do Firebase para o usuário
  function traduzirErro(code) {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Usuário não cadastrado ou e-mail/senha incorretos.';
      case 'auth/invalid-email':
        return 'E-mail inválido. Verifique o endereço digitado.';
      case 'auth/missing-password':
        return 'Informe a senha.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Aguarde um momento e tente novamente.';
      case 'auth/network-request-failed':
        return 'Falha de rede. Verifique sua conexão e a configuração do Firebase.';
      case 'auth/operation-not-allowed':
        return 'O provedor E-mail/senha não está habilitado no Firebase Authentication.';
      case 'auth/api-key-not-valid':
        return 'Firebase não configurado. Preencha o firebaseConfig em src/services/firebase.js.';
      case 'auth/configuration-not-found':
        return 'Projeto Firebase não configurado. Verifique o arquivo src/services/firebase.js.';
      default:
        return 'Usuário não cadastrado ou dados inválidos.';
    }
  }

  // Submit do formulário de login
  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');

    // Validação local básica
    if (!email.trim() || !senha) {
      setErro('Informe o e-mail e a senha.');
      return;
    }

    setCarregando(true);
    try {
      // Valida as credenciais no Firebase Authentication
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), senha);

      // Credenciais corretas -> muda para a página Principal
      navigate('/principal');
    } catch (error) {
      // Credenciais incorretas -> mensagem para o usuário na tela
      console.error('Erro no login:', error);
      setErro(traduzirErro(error.code));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="card-head">
        <div className="icon">🔐</div>
        <h1>Login</h1>
        <p>Acesse a página Principal</p>
      </div>

      {/* Mensagem de erro (usuário não cadastrado / senha incorreta) */}
      {erro && <div className="message error" role="alert">{erro}</div>}

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
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {/* Botão para acessar a página Principal */}
        <button type="submit" className="btn btn-primary" disabled={carregando}>
          {carregando && <span className="spinner" />}
          {carregando ? 'Entrando...' : 'Acessar Principal'}
        </button>
      </form>

      <p className="link-switch">
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
}
