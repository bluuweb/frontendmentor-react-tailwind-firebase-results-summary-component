import { useEffect, useState } from "react";
import CardResult from "./components/CardResult";
import CardSummary from "./components/CardSummary";
import { checkAuthState, db } from "./firebase";

import { collection, onSnapshot, query } from "firebase/firestore";
import { Summary } from "./types/interfaces";

export default function App() {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [summarys, setSummarys] = useState<Summary[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  if(disabled){
    setTimeout(() => {
      setDisabled(false);
    }, 1000 * 60);
  }

  useEffect(() => {
    checkAuthState()
      .then((user) => {
        console.log(user);
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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
          <CardResult />

          <CardSummary summarys={summarys} disabled={disabled} setDisabled={setDisabled}/>
        </article>
      </div>
    </main>
  );
}
