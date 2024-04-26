"use client";
import React, { useState } from "react";
import { Drawer, Typography, Box, TextField, Button } from "@mui/material";
import { Style } from "./AddDoc.Style";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "@/config";

interface AddDoc {
  ID: string;
  open: boolean;
  setonClose: any;
}

const AddDoc = ({ ID, open, setonClose }: AddDoc) => {
  const [Name, setName] = useState("");
  const [Code, setCode] = useState("");
  const [Url, setUrl] = useState("");
  const [Loading, setLoading] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setonClose(newOpen);
    setName("");
    setCode("");
    setUrl("");
  };

  const AddNewDoc = async () => {
    setLoading(true);
    try {
      const DocRef = await addDoc(collection(FIREBASE_FIRESTORE, "documents"), {
        code: Code,
        name: Name,
        org: ID,
        url: Url,
      }).then((res) => {
        setLoading(false);
        setName("");
        setCode("");
        setUrl("");
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
        <Button sx={{ mt: 2 }} variant="contained" onClick={AddNewDoc}>
          Add
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddDoc;
