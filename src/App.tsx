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
          console.log("New summary: ", change.doc.data(), change.doc.id);
          const summary = {
            id: change.doc.id,
            ...change.doc.data(),
          } as Summary;
          setSummarys([...summarys, summary]);
        }
        if (change.type === "modified") {
          console.log("Modified summary: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed summary: ", change.doc.data());
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

          <CardSummary summarys={summarys} />
        </article>
      </div>
    </main>
  );
}
