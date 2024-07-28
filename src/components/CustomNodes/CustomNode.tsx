import { Handle, NodeProps, Position } from "@xyflow/react";
import PeopleIcon from "@mui/icons-material/People";
import PowerIcon from "@mui/icons-material/Power";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ChairIcon from "@mui/icons-material/Chair";
import { useMemo } from "react";
import "./CustomNode.css";

const CustomNode = (props: NodeProps) => {
  const content = useMemo(() => {
    switch (props.type) {
      case "post":
        return <ChairIcon />;
      case "place":
        return <ApartmentIcon />;
      case "socket":
        return <PowerIcon />;
      case "people":
        return <PeopleIcon />;
    }
  }, [props.type]);
  const bgClass = useMemo(() => {
    switch (props.type) {
      case "post":
        return " green-bg";
      case "place":
        return "blue-bg";
      case "socket":
        return "purple-bg";
      case "people":
        return "orange-bg";
    }
  }, [props.type]);
  return (
    <>
      <div className={`container ${bgClass}`}>{content}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default CustomNode;
