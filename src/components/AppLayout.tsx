import { ReactNode } from "react";
import { Navbar } from "./NavBar/NavBar";
import { Sidebar } from "./Sidebar/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
};
export default AppLayout;
