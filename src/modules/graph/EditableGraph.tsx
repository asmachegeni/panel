import { useState, useCallback, useRef, useMemo } from "react";
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
    id: "38",
    data: { label: "Hello" },
    position: { x: 150, y: 150 },
    type: "people",
  },
  {
    id: "48",
    data: { label: "World" },
    position: { x: 200, y: 200 },
    type: "place",
  },
];
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
];

const initialEdges: any[] | (() => any[]) = [];

const EditableGraph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(initialEdges);
  const edgeReconnectSuccessful = useRef(true);
  const nodeTypes = useMemo(
    () => ({
      post: CustomNode,
      place: CustomNode,
      socket: CustomNode,
      people: CustomNode,
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
  const onConnect = useCallback((params: any) => {
    //request here
    console.log(params);
    return setEdges((eds) => addEdge(params, eds));
  }, []);
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
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={initialNodes as any}
        getOptionLabel={(option: any) => option.data.label}
        defaultValue={[]}
        renderInput={(params) => (
          <TextField {...params} label="limitTags" placeholder="Favorites" />
        )}
        sx={{ width: "500px" }}
        onChange={(event, value) => {
          console.log(value);
          setNodes(value as any);
        }} // prints the selected value
      />
      <ReactFlow
        nodes={nodes}
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
