import SignIn from "@/components/SignIn";
import { Box } from "@mui/material";
import { StyleKey } from "@/types";

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
