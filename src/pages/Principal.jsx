// ============================================================
//  PÁGINA 3 - PRINCIPAL
//  Traz os dados do usuário (nome, sobrenome e data de
//  nascimento) do Firestore e os exibe na tela.
// ============================================================

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

// Formata a data de nascimento para o padrão brasileiro
function formatarData(dataISO) {
  if (!dataISO) return '';
  const partes = dataISO.split('-'); // [ano, mês, dia]
  if (partes.length === 3) {
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
  return dataISO;
}

export default function Principal() {
  const navigate = useNavigate();
  const { usuario, carregando } = useAuth();

  const [dados, setDados] = useState(null);
  const [status, setStatus] = useState('carregando'); // carregando | ok | vazio

  useEffect(() => {
    // Enquanto o estado de autenticação é verificado, aguarda
    if (carregando) return;

    // Sem usuário logado não deveria chegar aqui
    // (a rota é protegida), mas mantém a segurança
    if (!usuario) {
      navigate('/login', { replace: true });
      return;
    }

    let ativo = true;

    // Busca os dados do usuário no Firestore usando o UID
    async function carregarDados() {
      try {
        const uid = usuario.uid || auth.currentUser?.uid;
        const snapshot = await getDoc(doc(db, 'usuarios', uid));

        if (!ativo) return;

        if (snapshot.exists()) {
          setDados(snapshot.data());
          setStatus('ok');
        } else {
          setStatus('vazio');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        if (ativo) setStatus('vazio');
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, [usuario, carregando, navigate]);

  // Aguardando autenticação
  if (carregando) {
    return (
      <div className="state-box loading">
        <div className="center-spin" aria-label="Carregando" />
        <p>Carregando...</p>
      </div>
    );
  }

  // Aguardando leitura do Firestore
  if (status === 'carregando') {
    return (
      <div className="state-box loading">
        <div className="center-spin" aria-label="Carregando" />
        <p>Buscando seus dados no Firestore...</p>
      </div>
    );
  }

  // Documento não encontrado no Firestore
  if (status === 'vazio') {
    return (
      <div className="state-box">
        <div className="big">📭</div>
        <p>
          Não encontramos seus dados no Firestore.
          <br />
          Verifique se o cadastro foi concluído e se a coleção
          <strong> usuarios</strong> existe no banco.
        </p>
        <button type="button" className="btn btn-outline mt-2" onClick={() => navigate('/cadastro')}>
          Ir para o Cadastro
        </button>
      </div>
    );
  }

  // Dados carregados com sucesso
  const iniciais = `${dados.nome?.[0] ?? ''}${dados.sobrenome?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="home-card">
      {/* Faixa superior com avatar e identificação */}
      <div className="home-banner">
        <div className="avatar">{iniciais}</div>
        <div className="who">
          <h2>Bem-vindo(a), {dados.nome}! 👋</h2>
          <p>{usuario.email}</p>
        </div>
      </div>

      {/* Lista com os dados do usuário gravados no Firestore */}
      <div className="home-body">
        <h3>Seus dados (Firestore)</h3>
        <ul className="data-list">
          <li className="data-item">
            <span className="ico">👤</span>
            <span>
              <span className="label">Nome</span>
              <br />
              <span className="value">{dados.nome}</span>
            </span>
          </li>

          <li className="data-item">
            <span className="ico">🪪</span>
            <span>
              <span className="label">Sobrenome</span>
              <br />
              <span className="value">{dados.sobrenome}</span>
            </span>
          </li>

          <li className="data-item">
            <span className="ico">🎂</span>
            <span>
              <span className="label">Data de Nascimento</span>
              <br />
              <span className="value">{formatarData(dados.dataNascimento)}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
