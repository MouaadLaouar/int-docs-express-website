import { Theme } from "@/theme";
import { ThemeProvider } from "@mui/material";

interface ContextProps {
  children: React.ReactNode;
}

const Context = ({ children }: ContextProps) => {
  return (
    <>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </>
  );
};

export default Context
