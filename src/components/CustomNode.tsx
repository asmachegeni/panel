import { Handle, NodeProps, Position } from "reactflow";
import { IoPersonSharp } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { PiOfficeChairFill } from "react-icons/pi";
export const CustomNode = (
  props: NodeProps & { nodeType: string; color: string }
) => {
  return (
    <>
      <div
        style={{
          width: "280px",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F2F2F2",
        }}
      >
        <Handle type="source" position={Position.Left} isConnectable />
        <Handle type="target" position={Position.Right} isConnectable />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "100%",
            position: "relative",
            border: `1px solid ${props.color}`,
          }}
        >
          <div
            style={{
              background: props.color,
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "-20%",
              left: "50%",
            }}
          >
            <IoPersonSharp size={32} color="white" />
          </div>
          <ul style={{ paddingTop: "6px" }}>
            {Object.keys(props.data).map((item) => (
              <li style={{ listStyle: "none", textAlign: "left" }}>
                <span>{item}: </span>
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {props.data[item]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export const PersonNode = (props: NodeProps) => {
  return <CustomNode {...props} color="purple" nodeType="person" />;
};

export const PositionNode = (props: NodeProps) => {
  return <CustomNode {...props} color="blue" nodeType="position" />;
};

export const PlaceNode = (props: NodeProps) => {
  return <CustomNode {...props} color="green" nodeType="place" />;
};
