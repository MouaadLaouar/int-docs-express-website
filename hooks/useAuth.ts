"use client"
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/config";
import { doc, getDoc } from "firebase/firestore";

export default function useAuth() {
  const [userID, setUserID] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (userID) {
        const DocRef = doc(FIREBASE_FIRESTORE, "users", userID);
        const docSnap: any = await getDoc(DocRef);
        setUser(docSnap.data());
        console.log(user);
      }
    };
    onAuthStateChanged(FIREBASE_AUTH, (User: any) => {
      if (User) {
        setUserID(User.uid);
      } else {
        setUserID(null);
      }
    });

    getUser();
  });

  return { userID, user };
}
