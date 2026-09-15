// ============================================================
//  Configuração e inicialização do Firebase
// ============================================================
//  1) Crie um projeto em https://console.firebase.google.com
//  2) Ative Authentication -> Sign-in method -> E-mail/senha
//  3) Crie um banco Firestore Database
//  4) Em Configurações do projeto -> Seus apps -> Web app,
//     copie o objeto firebaseConfig e cole abaixo:
// ============================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// >>> Substitua pelos dados do SEU projeto Firebase <<<
const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_AUTH_DOMAIN',
  projectId: 'SEU_PROJECT_ID',
  storageBucket: 'SEU_STORAGE_BUCKET',
  messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
  appId: 'SEU_APP_ID',
};

// Inicializa o app do Firebase
const app = initializeApp(firebaseConfig);

// Serviços exportados para toda a aplicação
export const auth = getAuth(app);
export const db = getFirestore(app);
