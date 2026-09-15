// ============================================================
//  Componente principal da aplicação
//  - BrowserRouter: habilita o sistema de rotas
//  - AuthProvider: compartilha o estado do usuário logado
//  - Navbar: menu de navegação entre as páginas
//  - AppRoutes: arquivo separado com todas as rotas
// ============================================================

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="app-main">
          <AppRoutes />
        </main>
        <footer className="app-footer">
          React + React Router Dom + Firebase Authentication + Firestore
        </footer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
