import { User } from "firebase/auth";
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { Summary } from "../types/interfaces";

interface CardAlertProps extends Summary{
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  getTimeServer: () => void;
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
  getTimeServer
}: CardAlertProps) {


  const handleIncrement = async() => {
    const summaryRef = doc(db, "summarys", id);
    const user: User | null = auth.currentUser;

    if(disabled){
      return;
    }

    if(user?.uid){
      setDisabled(true);
      const lastVoteRef = doc(db, "lastVotes", user.uid);
      
      await setDoc(lastVoteRef, {
        voteTime: serverTimestamp()
      });
      await updateDoc(summaryRef, {
        value: value + 1,
      });

      getTimeServer()
      // setTimeout(() => {
      //   setDisabled(false);
      // }, 1000 * 60);
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
