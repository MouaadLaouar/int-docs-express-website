"use client";
import React, { useEffect, useState } from "react";
import { Drawer, Typography, Box, TextField, Button } from "@mui/material";
import { Style } from "./AddDoc.Style";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "@/config";
import { useSetAtom } from "jotai";
import { DocEdit } from "@/jotai/Atom";

interface AddDoc {
  ID: string;
  open: boolean;
  setonClose: any;
  Data?: {
    code: any;
    name: any;
    url: any;
    id: any
  };
}

const AddDoc = ({ ID, open, setonClose, Data }: AddDoc) => {
  const [Name, setName] = useState("");
  const [Code, setCode] = useState("");
  const [Url, setUrl] = useState("");
  const [Loading, setLoading] = useState(false);
  const setDocEdit = useSetAtom(DocEdit);

  useEffect(() => {
    if (Data?.name) {
      setName(Data?.name);
      setCode(Data?.code);
      setUrl(Data?.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Data?.name, open]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setonClose(newOpen);
    setName("");
    setCode("");
    setUrl("");
    setDocEdit({
      code: "",
      name: "",
      url: "",
      id: ""
    });
  };

  const AddNewDoc = async () => {
    setLoading(true);
    try {
      await addDoc(collection(FIREBASE_FIRESTORE, "documents"), {
        code: Code,
        name: Name,
        org: ID,
        url: Url,
      }).then((res) => {
        setLoading(false);
        setName("");
        setCode("");
        setUrl("");
        setDocEdit({
          code: "",
          name: "",
          url: "",
          id: ""
        });
        setonClose(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateDoc = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(FIREBASE_FIRESTORE, "documents", Data?.id), {
        code: Code,
        name: Name,
        org: ID,
        url: Url,
      }).then((res) => {
        setLoading(false);
        setName("");
        setCode("");
        setUrl("");
        setDocEdit({
          code: "",
          name: "",
          url: "",
          id: ""
        });
        setonClose(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box sx={Style.AddDoc}>
        <Typography>Add New Doc</Typography>
        <TextField
          disabled={Loading}
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          sx={{ mt: 5 }}
          required
          label="Name"
        />
        <TextField
          disabled={Loading}
          value={Code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          sx={{ mt: 2 }}
          required
          label="Code"
        />
        <TextField
          disabled={Loading}
          value={Url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          sx={{ mt: 2 }}
          required
          label="Url"
        />
        {Data?.name ? (
          <Button sx={{ mt: 2 }} variant="contained" onClick={UpdateDoc}>
            Update
          </Button>
        ) : (
          <Button sx={{ mt: 2 }} variant="contained" onClick={AddNewDoc}>
            Add
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default AddDoc;
