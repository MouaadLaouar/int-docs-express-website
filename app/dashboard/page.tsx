"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/config";
import { useRouter } from "next/navigation";

import { Style } from "./dashboard.Style";
import { Box, Typography } from "@mui/material";
import NavBar from "@/components/NavBar";
import Table from "@/components/Table";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [IntOrgs, setIntOrgs] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (User) => {
      if (User) {
        const DocRef = doc(FIREBASE_FIRESTORE, "users", User.uid);
        const DocSnap: any = await getDoc(DocRef);
        const user = DocSnap.data();
        if (user.Role === "ADMIN") {
          setUser(DocSnap.data());
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    });

    const getData = async () => {
      const data: any[] = [];
      const querySnapshot = await getDocs(
        collection(FIREBASE_FIRESTORE, "intorgs")
      );
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          Name: doc.data().Name,
        });
      });
      console.log(data)
      setIntOrgs(data);
    };
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <NavBar Name={user.Name} />
      <Box sx={Style.Box}>
        <Typography variant="h4">See All the Organisation :</Typography>
        { IntOrgs.length > 0 && <Table Data={IntOrgs} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
