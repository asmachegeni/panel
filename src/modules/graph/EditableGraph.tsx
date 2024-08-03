import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  addEdge,
  reconnectEdge,
  Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "../../components/CustomNodes/CustomNode";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";
import GraphService from "./graph.service";
import { position } from "stylis";

const initialNodes = [
  {
    id: "18",
    data: { label: "Hello" },
    position: { x: 50, y: 50 },
    type: "post",
  },
  {
    id: "28",
    data: { label: "World" },
    position: { x: 100, y: 100 },
    type: "socket",
  },

  {
    id: "48",
    data: { label: "gfg" },
    position: { x: 200, y: 200 },
    type: "place",
  },
];

const initialEdges: any[] | (() => any[]) = [];

const EditableGraph = ({ nodes }: { nodes: any[] }) => {
  const [newnodes, setNodes] = useState([]);
  const [n, setn] = useState<any[]>([]);
  useEffect(() => {
    if (nodes.length > 0) {
      setn(nodes as any[]);
    }
  }, [nodes]);
  const [edges, setEdges] = useState(initialEdges);
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
      //request here
      console.log("on Connect", params);

      const s: any = newnodes.filter((item: any) => item.id == params.source);
      const t: any = newnodes.filter((item: any) => item.id == params.target);
      console.log(s[0]?.type, "----", t[0]?.type);
      const type = [s[0]?.type, t[0]?.type];
      type.sort();
      console.log(type);
      // GraphService.add(
      //   {
      //     startNode: params.source,
      //     endNode: params.target,
      //     relationship: "string", //complete later
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      // );
      return setEdges((eds) => addEdge(params, eds));
    },
    [newnodes]
  );
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge: any, newConnection: Connection) => {
    console.log(oldEdge);
    console.log("*********************");
    console.log(newConnection);
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_: any, edge: { id: any }) => {
    console.log("-------------------------- ", edge);
    // request here
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, []);
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
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={n as any}
        getOptionLabel={(option: any) => option.data.name || option.data.title}
        defaultValue={[]}
        renderInput={(params) => (
          <TextField {...params} label="limitTags" placeholder="Favorites" />
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
              label={item.data.name || item.data.title}
              {...getTagProps({ index })}
            />
          ));
        }}
        // getOptionDisabled={() => nodes && nodes.length >= 10}
        sx={{ width: "500px" }}
        onChange={(event, value: any) => {
          // GraphService.get(value[value.length - 1].id, "string", {
          //   headers: {
          //     Authorization: `Bearer ${localStorage.getItem("token")}`,
          //   },
          // });

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
        edges={edges}
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
