// ============================================================
//  Contexto de Autenticação
//  Mantém o estado do usuário logado em toda a aplicação,
//  observando o Firebase Authentication em tempo real.
// ============================================================

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

// Cria o contexto
export const AuthContext = createContext();

// Provedor que envolve a aplicação
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Observa mudanças de login/logout no Firebase Authentication
    const listener = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });

    // Limpa o listener ao desmontar o componente
    return () => listener();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook de atalho para acessar o contexto em qualquer página
export function useAuth() {
  return useContext(AuthContext);
}
