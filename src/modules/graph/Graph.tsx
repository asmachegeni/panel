import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { GeneralGraph } from "./GeneralGraph";
import EditableGraph from "./EditableGraph";

const Graph = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    document.title = 'نمایش گراف';
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth"
           
          >
            <Tab label="گراف کلی" value="1" />
            <Tab label="ویرایش گراف" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <GeneralGraph />
        </TabPanel>
        <TabPanel value="2">
          <EditableGraph />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Graph;
