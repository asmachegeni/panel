import ReactFlow, {
  Controls,
  Background,
  addEdge,
  Connection,
  Edge,
  useNodesState,
  useEdgesState,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { PersonForm } from "../components/PersonForm";
import { Button } from "@mui/material";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PersonService from "../services/person.service";
import { PersonNode, PlaceNode, PositionNode } from "../components/CustomNode";
import { ContextMenu } from "../components/ContetxtMenu";
import { Bounce, ToastContainer } from "react-toastify";
const values: {
  setOpen: any;
  setMenu: any;
  setId: any;
  setIsEditMode: any;
  refresh: any;
} = {
  setOpen: () => {},
  setMenu: () => {},
  setId: () => {},
  setIsEditMode: () => {},
  refresh: () => {},
};
export const HomeContext = createContext(values);
export const Home = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [menu, setMenu] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const ref = useRef<HTMLInputElement>(null);
  const nodeTypes = useMemo(
    () => ({
      personNode: PersonNode,
      positionNode: PositionNode,
      placeNode: PlaceNode,
    }),
    []
  );

  const refresh = useCallback(() => {
    PersonService.getAll({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res: any) => {
      let x = 0;
      let y = 0;
      const data = res.data.data.map((person: any) => {
        x = Math.random() * 1000;
        y = Math.random() * 700;
        return {
          id: `${person.id}`,
          type: "personNode",
          position: { x, y },
          data: {
            firstName: person.name,
            lastName: person.lastname,
            email: person.email,
            caller_id: person.caller_id,
          },
        };
      });

      setNodes(data);
    });
  }, []);
  useEffect(() => {
    refresh();
  }, []);
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) => addEdge(params, eds) as any),
    [setEdges]
  );
  const nodeColor = useCallback((node: any) => {
    if (node.type === "personNode") {
      return "purple";
    } else if (node.type === "positionNode") {
      return "blue";
    } else if (node.type === "placeNode") {
      return "green";
    }
    return "#f2f2f2";
  }, []);
  const onNodeContextMenu = useCallback(
    (
      event: { preventDefault: () => void; clientY: number; clientX: number },
      node: any
    ) => {
      event.preventDefault();

      setMenu({
        id: node.id,
        name: `${node.data.firstName} ${node.data.lastName}`,
        top: event.clientY - 75,
        right: event.clientX - 75,
      });
    },
    [setMenu]
  );
  return (
    <HomeContext.Provider
      value={{
        setOpen,
        setMenu,
        setId,
        setIsEditMode,
        refresh,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "85vh",
          overflow: "hidden",
        }}
      >
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

        <PersonForm open={open} id={id} isEditMode={isEditMode} />

        <Button
          onClick={() => {
            setOpen(true);
            setIsEditMode(false);
            setId(-1);
          }}
          color="info"
          variant="contained"
        >
          اضافه کردن فرد
        </Button>

        <ReactFlow
          ref={ref}
          nodes={nodes as any}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          nodeTypes={nodeTypes}
          onPaneClick={onPaneClick}
        >
          <Background />
          <Controls />
          <MiniMap nodeColor={nodeColor} />
          {menu && <ContextMenu {...menu} />}
        </ReactFlow>
      </div>
    </HomeContext.Provider>
  );
};
