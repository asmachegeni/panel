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
import RelationshipService from "./relationship.service";
import { Bounce, toast } from "react-toastify";

const initialEdges: any[] | (() => any[]) = [];

const EditableGraph = ({ nodes, edges }: { nodes: any[]; edges: any[] }) => {
  const [newnodes, setNodes] = useState([]);
  const [n, setn] = useState<any[]>([]);
  const [ed, setEdges] = useState(initialEdges);
  useEffect(() => {
    if (nodes.length > 0) {
      setn(nodes as any[]);
      const newedges = edges.map((item: any) => {
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
  const edgeReconnectSuccessful = useRef(true);
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
      const t: any = newnodes.filter((item: any) => item.id == params.target);
      const s: any = newnodes.filter((item: any) => item.id == params.source);
      if (
        t[0]?.type === s[0]?.type ||
        (t[0]?.type !== "SOCKET" && s[0]?.type !== "SOCKET")
      ) {
        toast.error("بین دو گره انتخاب شده نمی‌توان ارتباط برقرار کرد", {
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
      } else {
        let relationship = "";
        if (t[0]?.type === "SOCKET") {
          relationship = `HAS${s[0]?.type}`;
        } else if (s[0]?.type === "SOCKET") {
          relationship = `HAS${t[0]?.type}`;
        }
        RelationshipService.add({
          startNode: params.source,
          endNode: params.target,
          relationship: relationship,
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
      }
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

      RelationshipService.delete(edge.id, edge?.data?.type)
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
            label="انتخاب گره"
            placeholder="گره مورد نظر را از لیست زیر انتخاب یا جستجو کنید..."
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
        // getOptionDisabled={() => nodes.length && nodes.length >= 10}
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

export default EditableGraph;
