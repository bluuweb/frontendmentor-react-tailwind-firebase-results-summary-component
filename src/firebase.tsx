import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";

import { doc, Firestore, getFirestore, setDoc, serverTimestamp, getDoc  } from "firebase/firestore";

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
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe();
        if (user) {
          const lastVoteRef = doc(db, "lastVotes", user.uid);
          
          const docSnap = await getDoc(lastVoteRef);
        
          if(!docSnap.exists()){
            await setDoc(lastVoteRef, {
              lastVoteServerTime: serverTimestamp(),
            });
          }
          resolve(user);
        } else {
          try {
            resolve(await loginAnonymously());
          } catch (error) {
            reject(error);
          }
        }
      },
      reject
    );
  });

const loginAnonymously = async (): Promise<unknown> => {
  try {
    const res = await signInAnonymously(auth);
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
