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
      case "POST":
        return <ChairIcon />;
      case "PLACE":
        return <ApartmentIcon />;
      case "SOCKET":
        return <PowerIcon />;
      case "PERSON":
        return <PeopleIcon />;
    }
  }, [props.type]);
  const bgClass = useMemo(() => {
    switch (props.type) {
      case "POST":
        return " green-bg";
      case "PLACE":
        return "blue-bg";
      case "SOCKET":
        return "purple-bg";
      case "PERSON":
        return "orange-bg";
    }
  }, [props.type]);

  return (
    <>
      <div className="container">
        <p className="title">
          {props.data.name ||
            props.data.title ||
            (props.data.socket_number as any)}
        </p>
        <div className={`circle ${bgClass}`}>{content}</div>
      </div>
      <Handle type="target" position={Position.Right} />
      <Handle type="source" position={Position.Left} />
    </>
  );
};

export default CustomNode;
