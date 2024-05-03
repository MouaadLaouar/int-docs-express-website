"use client";
import React, { useEffect, useState } from "react";
import { Drawer, Typography, Box, TextField, Button } from "@mui/material";
import { Style } from "./AddOrg.Style";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "@/config";
import { useSetAtom } from "jotai";
import { OrgEdit } from "@/jotai/Atom";

interface AddDoc {
  open: boolean;
  setonClose: any;
  Data?: {
    id: any;
    Name: any;
  };
}

const AddOrg = ({ open, setonClose, Data }: AddDoc) => {
  const [Name, setName] = useState(Data?.Name || "");
  const [Loading, setLoading] = useState(false);
  const setOrgEdit = useSetAtom(OrgEdit);

  useEffect(() => {
    if (Data?.Name) {
      setName(Data?.Name);
    }
  }, [Data?.Name, open]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setonClose(newOpen);
    setName("");
    setOrgEdit({
      id: null,
      Name: null,
    });
  };

  const AddNewDoc = async () => {
    setLoading(true);
    try {
      await addDoc(collection(FIREBASE_FIRESTORE, "intorgs"), {
        Name: Name,
      }).then((res) => {
        setLoading(false);
        setName("");
        setonClose(false);
        setOrgEdit({
          id: null,
          Name: null,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateOrg = async () => {
    try {
      await updateDoc(doc(FIREBASE_FIRESTORE, "intorgs", Data?.id), {
        Name: Name,
      }).then((res) => {
        setLoading(false);
        setName("");
        setonClose(false);
        setOrgEdit({
          id: null,
          Name: null,
        });
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
        {Data?.id ? (
          <Button sx={{ mt: 2 }} variant="contained" onClick={UpdateOrg}>
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

export default AddOrg;
