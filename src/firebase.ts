import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDMrF4HlwTrhDwQTRRZnyx-UeXvBhNKvUk",
  authDomain: "kathalaya-e3617.firebaseapp.com",
  projectId: "kathalaya-e3617",
  storageBucket: "kathalaya-e3617.firebasestorage.app",
  messagingSenderId: "926037704111",
  appId: "1:926037704111:web:25fb90bba12ac41506435a",
  measurementId: "G-GLLR42RXPB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, collection, addDoc };
