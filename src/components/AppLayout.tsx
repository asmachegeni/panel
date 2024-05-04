import { ReactNode } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CssBaseline />
      <Grid container flexDirection={"row"} columnSpacing={"16px"} sx={{bgcolor:'#fafafa'}} justifyContent={"space-between"}>
        <Grid item>
          <Sidebar />
        </Grid>
        <Grid item>
          <div
            style={{
              width: `calc(100vw - 270px)`,
              display: "flex",
              justifyContent: "center",
              paddingTop:'36px',
          
            }}
          >
            {children}
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default AppLayout;
