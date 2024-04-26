"use client";
import React from "react";
import { Style } from "./NavBar.Style";
import { Box, Button, Typography } from "@mui/material";
import { FIREBASE_AUTH } from "@/config";

interface NavBarProps {
  Name: string;
}

const NavBar = ({ Name }: NavBarProps) => {
  const auth = FIREBASE_AUTH;
  return (
    <Box sx={Style.Box}>
      <Typography>Hello, {Name} 👋</Typography>
      <Button
        variant="contained"
        onClick={() => {
          auth.signOut();
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default NavBar;
