import { useEffect, useState } from "react";
import CardResult from "./components/CardResult";
import CardSummary from "./components/CardSummary";
import { auth, checkAuthState, db } from "./firebase";

import { collection, doc, getDoc, onSnapshot, query, Timestamp } from "firebase/firestore";
import { Summary } from "./types/interfaces";
import { User } from "firebase/auth";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [summarys, setSummarys] = useState<Summary[]>([]);

  const [disabled, setDisabled] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(0);

  const getTimeServer = async() => {
    const user: User | null = auth.currentUser;
    if(!user){
      return;
    }
    const docRef = doc(db, "lastVotes", user.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const lastVoteTime = docSnap.data()?.voteTime?.toDate();
      const serverNow = new Date(Timestamp.now().seconds * 1000);
      const diff =   serverNow.getTime() - lastVoteTime.getTime();
      const minutes = Math.floor(diff / 1000 / 60);
      if (minutes < 1) {
        const seconds = Math.floor(diff / 1000) - minutes * 60;
        const remainingTime = 60 - seconds; 

        setCountdown(remainingTime); // actualizar cuenta regresiva
        setDisabled(true);

        if(diff < 0){
          setCountdown(60);
        }

        const countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => {
            const newCountdown = prevCountdown - 1;
            if (newCountdown === 0) {
              clearInterval(countdownInterval);
              setDisabled(false);
            }
            return newCountdown;
          });
        }, 1000);

        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else {
      setDisabled(false);
    }
  }

  useEffect(() => {
    checkAuthState()
      .then((user) => {
        getTimeServer();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  
  // observe the document summarys
  const q = query(collection(db, "summarys"));
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const summary = {
            id: change.doc.id,
            ...change.doc.data(),
          } as Summary;
          
          setSummarys(prev => [...prev, summary]);
        }
        if (change.type === "modified") {
          const summary = {
            id: change.doc.id,
            ...change.doc.data(),
          } as Summary;
          
          setSummarys(prev => prev.map(s => s.id === summary.id ? summary : s));
        }
        if (change.type === "removed") {
          const summary = {
            id: change.doc.id,
            ...change.doc.data(),
          } as Summary;

          setSummarys(prev => prev.filter(s => s.id !== summary.id));
        }
      });
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="bg-slate-400 md:bg-purple-400">
      <div className="container mx-auto grid min-h-screen bg-slate-400 sm:place-content-center md:bg-purple-400">
        <article className="grid max-w-4xl overflow-hidden bg-white shadow-md sm:grid-cols-2 sm:rounded-3xl">
          
          <CardResult countdown={countdown}/>

          <CardSummary summarys={summarys} disabled={disabled} setDisabled={setDisabled} getTimeServer={getTimeServer}/>
        </article>
      </div>
    </main>
  );
}
