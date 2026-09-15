// ============================================================
//  Componente principal da aplicação
//  - BrowserRouter: habilita o sistema de rotas
//    (basename aponta para o subcaminho do GitHub Pages)
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
      <BrowserRouter basename="/react-firebase-auth-app">
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
