// ============================================================
//  ARQUIVO DE ROTAS (React Router Dom)
//  Centraliza todas as rotas da aplicação em um arquivo
//  separado, conforme apresentado em aula.
// ============================================================

import { Routes, Route, Navigate } from 'react-router-dom';

import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Principal from '../pages/Principal';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Página 1 - Cadastro de usuário */}
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Página 2 - Login */}
      <Route path="/login" element={<Login />} />

      {/* Página 3 - Principal (somente para usuários logados) */}
      <Route
        path="/principal"
        element={
          <ProtectedRoute>
            <Principal />
          </ProtectedRoute>
        }
      />

      {/* Rota inicial redireciona para o Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Qualquer outra rota -> Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
