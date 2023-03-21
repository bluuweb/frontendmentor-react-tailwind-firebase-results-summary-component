import { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";
import { Summary } from "../types/interfaces";

interface CardAlertProps extends Summary{
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
}

export default function CardAlert({
  id,
  icon,
  title,
  value,
  total,
  bgColor = "bg-orange-100",
  titleColor = "text-orange-900",
  disabled,
  setDisabled,
}: CardAlertProps) {

  const handleIncrement = async() => {
    const summaryRef = doc(db, "summarys", id);

    // currentUser
    const user: User | null = auth.currentUser;

    if(disabled){
      return;
    }
    // Consulta la hora de la última votación del usuario desde la base de datos.
    if(user?.uid){

      setDisabled(true);

      const lastVoteRef = doc(db, "lastVotes", user.uid);
      await setDoc(lastVoteRef, {
        currentVoteServerTime: serverTimestamp(),
      }, { merge: true });

      const lastVoteDoc = await getDoc(lastVoteRef);
      const lastVoteServerTime = lastVoteDoc.data()?.lastVoteServerTime;
      const currentVoteServerTime = lastVoteDoc.data()?.currentVoteServerTime;

      // Compara la hora de la última votación con la marca de tiempo del servidor para determinar si ha pasado al menos un minuto.
      const canVote = !lastVoteServerTime || (currentVoteServerTime.toDate().getTime() - lastVoteServerTime.toDate().getTime()) >= (60 * 1000);

      console.log((currentVoteServerTime.toDate().getTime() - lastVoteServerTime.toDate().getTime()))
      // Si ha pasado al menos un minuto, permite la votación y actualiza la hora de la última votación en la base de datos.
      if (canVote) {
        await setDoc(lastVoteRef, {
          lastVoteServerTime: serverTimestamp(),
        }, { merge: true });

        await updateDoc(summaryRef, {
          value: value + 1,
        });
        console.log("Increment", id);
        
      } else {
        console.log("No se puede votar en este momento");
      }

      
    }

  };

  return (
    <article
      className={`flex items-center gap-2 rounded-lg ${bgColor} p-4 font-semibold ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={handleIncrement}
    >
      <i className={icon}></i>

      <span className={`flex-1 ${titleColor}`}>{title}</span>
      <div>
        <span className="mr-2  text-sky-900">{value}</span>
        <span className=" text-gray-400">/ {total}</span>
      </div>
    </article>
  );
}
