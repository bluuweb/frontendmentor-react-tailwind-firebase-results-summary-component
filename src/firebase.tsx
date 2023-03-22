import { FirebaseApp, FirebaseError, FirebaseOptions, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
  UserCredential,
} from "firebase/auth";

import { Firestore, getFirestore  } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export const checkAuthState = () =>
  new Promise<User | UserCredential>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          try {
            resolve(await loginAnonymously());
          } catch (error) {
            reject(error as Error);
          }
        }
      },
      reject
    );
  });

const loginAnonymously = async (): Promise<UserCredential> => {
  return await signInAnonymously(auth);
};
