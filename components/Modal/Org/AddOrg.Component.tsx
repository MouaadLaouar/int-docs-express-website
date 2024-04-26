"use client";
import React, { useState } from "react";
import { Drawer, Typography, Box, TextField, Button } from "@mui/material";
import { Style } from "./AddOrg.Style";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "@/config";

interface AddDoc {
  open: boolean;
  setonClose: any;
}

const AddOrg = ({ open, setonClose }: AddDoc) => {
  const [Name, setName] = useState("");
  const [Loading, setLoading] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setonClose(newOpen);
    setName("");
  };

  const AddNewDoc = async () => {
    setLoading(true);
    try {
      const DocRef = await addDoc(collection(FIREBASE_FIRESTORE, "intorgs"), {
        Name: Name,
      }).then((res) => {
        setLoading(false);
        setName("");
        setonClose(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box sx={Style.AddOrg}>
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
        <Button sx={{ mt: 2 }} variant="contained" onClick={AddNewDoc}>
          Add
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddOrg