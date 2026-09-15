// ============================================================
//  Rota Protegida
//  Só permite acessar a página Principal se houver usuário
//  logado no Firebase Authentication. Caso contrário,
//  redireciona para a página de Login.
// ============================================================

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { usuario, carregando } = useAuth();
  const location = useLocation();

  // Aguarda a verificação do estado de autenticação
  if (carregando) {
    return (
      <div className="state-box loading">
        <div className="center-spin" aria-label="Carregando" />
        <p>Verificando autenticação...</p>
      </div>
    );
  }

  // Sem usuário logado -> volta para o Login
  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Usuário logado -> renderiza a página solicitada
  return children;
}
