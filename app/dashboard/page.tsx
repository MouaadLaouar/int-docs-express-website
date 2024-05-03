"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/config";
import { useRouter } from "next/navigation";

import { Style } from "./dashboard.Style";
import { Box, Button, Typography } from "@mui/material";
import NavBar from "@/components/NavBar";
import Table from "@/components/Table";
import AddOrg from "@/components/Modal/Org/AddOrg.Component";
import { OrgEdit, openModel } from "@/jotai/Atom";
import { useAtom } from "jotai";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [IntOrgs, setIntOrgs] = useState<any[]>([]);
  const [open, setOpen] = useAtom(openModel);
  const [orgEdit] = useAtom(OrgEdit);

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
    setIntOrgs(data);
  };

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

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CloseDrawer = (close: boolean) => {
    setOpen(close);
    getData();
  };

  const DeleteDoc = async (ID: string) => {
    try {
      await deleteDoc(doc(FIREBASE_FIRESTORE, "intorgs", ID)).then(() => {
        getData();
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <NavBar Name={user.Name} />
      <Box sx={Style.Box}>
        <Box sx={Style.AppBar}>
          <Typography variant="h4">See All the Organisation :</Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Org
          </Button>
        </Box>
        {IntOrgs.length > 0 && <Table Data={IntOrgs} DeleteDoc={DeleteDoc} />}
      </Box>
      <AddOrg open={open} setonClose={CloseDrawer} Data={orgEdit} />
    </Box>
  );
};

export default Dashboard;
