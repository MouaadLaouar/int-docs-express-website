"use client";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/config";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Style } from "./Docs.Style";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

import AddDoc from "@/components/Modal/Docs/AddDoc.Component";

export default function Page({ params }: { params: { slug: string } }) {
  const IntOrg = params.slug;
  const [Documents, setDocuments] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const getData = async () => {
    try {
      const data: any[] = [];

      const q = query(
        collection(FIREBASE_FIRESTORE, "documents"),
        where("org", "==", IntOrg)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      
      // Set the retrieved documents to the state
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (User) => {
      if (User) {
        const DocRef = doc(FIREBASE_FIRESTORE, "users", User.uid);
        const DocSnap: any = await getDoc(DocRef);
        const user = DocSnap.data();
        if (user.Role !== "ADMIN") {
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
      await deleteDoc(doc(FIREBASE_FIRESTORE, "documents", ID)).then(() => {
        getData();
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box sx={Style.Docs}>
      <Box sx={Style.AppBar}>
        <Typography>Docs Details</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Doc
        </Button>
      </Box>
      <TableContainer component={Paper} sx={Style.Table}>
        <Table>
          <TableHead sx={Style.TableHead}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Url</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Documents.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.url.slice(0, 30)}...</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      DeleteDoc(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddDoc ID={IntOrg} open={open} setonClose={CloseDrawer} />
    </Box>
  );
}
