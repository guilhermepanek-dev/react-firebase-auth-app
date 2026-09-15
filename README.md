# React Firebase Auth App 🔥

> 🌐 **Site publicado:** https://guilhermepanek-dev.github.io/react-firebase-auth-app/

Aplicação em **React** com **3 páginas distintas** construída com **React Router Dom** (rotas em arquivo separado) e integração com **Firebase Authentication** (provedor E-mail/senha) + **Cloud Firestore**.

## 📄 Páginas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/cadastro` | **Página 1 - Cadastro** | 5 inputs: e-mail, senha, nome, sobrenome e data de nascimento. O botão **Cadastrar** cria o usuário no Firebase Authentication (E-mail/senha) e grava o restante dos dados no **Firestore**, incluindo o **UID** do usuário nos atributos do documento. |
| `/login` | **Página 2 - Login** | 2 inputs: e-mail e senha. O botão **Acessar Principal** valida os dados no Firebase Authentication. Se estiverem corretos, navega para a página **Principal**; caso contrário, exibe na tela a mensagem de que o usuário não está cadastrado / dados inválidos. |
| `/principal` | **Página 3 - Principal** | Exibe na tela os dados do usuário gravados no Firestore: **nome**, **sobrenome** e **data de nascimento**. Rota protegida: só acessível com usuário logado. |

## 🗂️ Estrutura do projeto

```
react-firebase-auth-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # Ponto de entrada
    ├── App.jsx                   # BrowserRouter + AuthProvider + Navbar
    ├── routes/
    │   └── AppRoutes.jsx         # ✅ Arquivo separado com todas as ROTAS
    ├── pages/
    │   ├── Cadastro.jsx          # Página 1 - Cadastro
    │   ├── Login.jsx             # Página 2 - Login
    │   └── Principal.jsx         # Página 3 - Principal
    ├── components/
    │   ├── Navbar.jsx            # Menu de navegação
    │   └── ProtectedRoute.jsx    # Guard de rota (exige login)
    ├── context/
    │   └── AuthContext.jsx       # Estado global do usuário (onAuthStateChanged)
    ├── services/
    │   └── firebase.js           # Configuração do Firebase (Auth + Firestore)
    └── styles/
        └── app.css               # Estilos da aplicação
```

## ⚙️ Como rodar o projeto

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Configure o Firebase** no arquivo `src/services/firebase.js` (veja a seção abaixo).

3. **Execute em modo de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Build de produção:**

   ```bash
   npm run build
   ```

## 🔥 Configurando o Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com) e crie um projeto.
2. **Authentication → Sign-in method →** habilite o provedor **E-mail/senha**.
3. **Firestore Database → Create database** (crie o banco, modo de produção ou teste).
4. Em **Project settings → Your apps → Web app (`</>`)**, copie o objeto `firebaseConfig`.
5. Cole os valores no arquivo `src/services/firebase.js`:

   ```js
   const firebaseConfig = {
     apiKey: 'SUA_API_KEY',
     authDomain: 'SEU_AUTH_DOMAIN',
     projectId: 'SEU_PROJECT_ID',
     storageBucket: 'SEU_STORAGE_BUCKET',
     messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
     appId: 'SEU_APP_ID',
   };
   ```

### 📊 Estrutura do documento no Firestore

Coleção: `usuarios` · ID do documento: **UID do usuário**

| Campo | Descrição |
|-------|-----------|
| `uid` | UID do usuário criado no Firebase Authentication |
| `nome` | Nome informado no cadastro |
| `sobrenome` | Sobrenome informado no cadastro |
| `email` | E-mail do usuário |
| `dataNascimento` | Data de nascimento (formato ISO: AAAA-MM-DD) |
| `criadoEm` | Data/hora da criação do cadastro (ISO) |

## 🧰 Tecnologias

- **React 19** (via Vite)
- **React Router Dom 7** — navegação e rotas
- **Firebase 12** — Authentication (E-mail/senha) + Cloud Firestore

## 🔗 Rotas em arquivo separado

Todas as rotas ficam centralizadas em `src/routes/AppRoutes.jsx`, conforme apresentado em aula, e são utilizadas pelo `App.jsx` dentro de um `<BrowserRouter>`.

## 🛡️ Observação sobre as regras do Firestore

Para testar durante o desenvolvimento, as regras do Firestore podem ficar assim:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## 👤 Autores

Projeto para fins de estudo — React Router Dom + Firebase Authentication + Firestore.
