// ============================================================
//  Barra de navegação superior (links do React Router Dom)
// ============================================================

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  // Efetua logout no Firebase e volta para a tela de Login
  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  }

  return (
    <header className="app-header">
      <div className="inner">
        <Link to="/" className="brand">
          <span className="logo">⚡</span>
          React Firebase Auth
        </Link>

        <nav className="nav">
          <NavLink to="/cadastro" className={({ isActive }) => (isActive ? 'active' : '')}>
            Cadastro
          </NavLink>

          {usuario ? (
            <>
              <NavLink to="/principal" className={({ isActive }) => (isActive ? 'active' : '')}>
                Principal
              </NavLink>
              <button type="button" className="btn btn-outline" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
