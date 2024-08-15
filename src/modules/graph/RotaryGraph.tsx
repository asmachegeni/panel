import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
  addEdge,
  reconnectEdge,
  Connection,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "../../components/CustomNodes/CustomNode";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";
import RotaryService from "./rotary.service";
import { Bounce, toast } from "react-toastify";

const initialEdges: any[] | (() => any[]) = [];

const RotaryGraph = ({ nodes, edges }: { nodes: any[]; edges: any[] }) => {
  const [newnodes, setNodes] = useState([]);
  const [n, setn] = useState<any[]>([]);
  const [ed, setEdges] = useState(initialEdges);
  const edgeReconnectSuccessful = useRef(true);
  useEffect(() => {
    if (nodes.length > 0) {
      const t = nodes.filter(
        (item: { id: string; data: { lables: any[] } }) => {
          return (item?.data?.lables[0] as any) === "SOCKET";
        }
      );

      setn(t as any[]);
      const newedges = edges
        .filter((item) => item.data.type === "ROTARY")
        .map((item: any) => {
          return {
            source: String(item.data.start),
            target: String(item.data.end),
            id: item.id,
            data: { type: item.data.type },
            markerEnd: {
              type: MarkerType.Arrow,
            },
          };
        });
      setEdges(newedges);
    }
  }, [nodes, edges]);
  const nodeTypes = useMemo(
    () => ({
      POST: CustomNode,
      PLACE: CustomNode,
      SOCKET: CustomNode,
      PERSON: CustomNode,
    }),
    []
  );
  const bgTag = useCallback((type: any) => {
    switch (type) {
      case "POST":
        return "#4ade80";
      case "PLACE":
        return "#60a5fa";
      case "SOCKET":
        return "#c084fc";
      case "PERSON":
        return "#fdba74";
    }
  }, []);
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<any>[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: any) => {
      RotaryService.add({
        startNode: params.source,
        endNode: params.target,
      })
        .then((res) => {
          if (res.status === 201) {
            toast.success("ارتباط جدید با موفقیت ایجاد شد", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        })
        .catch((res) => {
          toast.error(res.response.data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
      return setEdges((eds) => addEdge(params, eds));
    },
    [newnodes]
  );
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);
  const onReconnect = useCallback((oldEdge: any, newConnection: Connection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);
  const onReconnectEnd = useCallback(
    (
      _: any,
      edge: {
        data: any;
        source(source: any): unknown;
        id: any;
      }
    ) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      RotaryService.delete(edge.id)
        .then((res) => {
          if (res.status === 200) {
            toast.success("ارتباط  با موفقیت حذف شد", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        })
        .catch((res) => {
          toast.error(res.response.data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
      edgeReconnectSuccessful.current = true;
    },
    []
  );

  return (
    <div style={{ height: "78vh", width: "100%", overflowX: "hidden" }}>
      <Autocomplete
        multiple
        limitTags={2}
        options={n as any}
        getOptionLabel={(option: any) =>
          option.data.name || option.data.title || option.data.socket_number
        }
        defaultValue={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            label="انتخاب سوکت"
            placeholder="سوکت مورد نظر را از لیست زیر انتخاب یا جستجو کنید..."
          />
        )}
        renderTags={(params, getTagProps) => {
          return params.map((item: any, index: any) => (
            <Chip
              style={{
                padding: "4px",
                background: `${bgTag(item.data.lables[0])}`,
                marginLeft: "2px",
                borderRadius: "32px",
              }}
              variant="filled"
              label={
                item.data.name || item.data.title || item.data.socket_number
              }
              {...getTagProps({ index })}
            />
          ));
        }}
        sx={{ width: "500px" }}
        onChange={(_event, value: any) => {
          setNodes(
            value.map((item: any) => {
              return {
                ...item,
                type: item.data.lables[0],
                position: { x: Math.random() * 100, y: Math.random() * 100 },
              };
            }) as any
          );
        }}
      />
      <ReactFlow
        nodes={newnodes}
        onNodesChange={onNodesChange}
        edges={ed}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default RotaryGraph;
