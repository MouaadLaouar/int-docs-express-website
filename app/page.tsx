import SignIn from "@/components/SignIn";
import { Box } from "@mui/material";
import { StyleKey } from "@/types";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  return (
    <Box sx={Style.Box}>
      <SignIn />
    </Box>
  );
}

const Style:StyleKey = {
  Box: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
