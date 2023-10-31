import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7L1O51CTPvq46yLAYxNNvtQ8dz7n78ng",
  authDomain: "todo-app-ad450.firebaseapp.com",
  projectId: "todo-app-ad450",
  storageBucket: "todo-app-ad450.appspot.com",
  messagingSenderId: "147572357140",
  appId: "1:147572357140:web:19bdc9e716da7ca89a0f01",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export default app;
