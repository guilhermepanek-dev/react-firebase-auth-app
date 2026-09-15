// Serviço de configuração do Firebase
// Projeto: react-firebase-auth-app-f9182 (console.firebase.google.com)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBpeQ5Uyxb8Y3Ha5YJUUqSoJ701xJx8mTI',
  authDomain: 'react-firebase-auth-app-f9182.firebaseapp.com',
  projectId: 'react-firebase-auth-app-f9182',
  storageBucket: 'react-firebase-auth-app-f9182.firebasestorage.app',
  messagingSenderId: '897019259605',
  appId: '1:897019259605:web:1664858a9b829bd003505c',
};

// Inicializa o app do Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias de Authentication e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
