import {
  Cosmograph,
  CosmographProvider,
  CosmographSearch,
} from "@cosmograph/react";
import {
  AppBar,
  Autocomplete,
  Button,
  TextField,
  Toolbar,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import RotaryService from "./rotary.service";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import RelationshipService from "./relationship.service";
export const GeneralGraph = ({
  nodes,
  edges,
}: {
  nodes: any[];
  edges: any[];
}) => {
  const [n, setNodes] = useState<any>([]);
  const [links, setLinks] = useState<any>([]);
  useEffect(() => {
    if (nodes.length > 0) {
      const newNode = nodes.map((item) => {
        return {
          id: item.id,
          ...item.data,
        };
      });
      setNodes(newNode as any[]);
      const newedges = edges.map((item: any) => {
        return {
          source: String(item.data.start),
          target: String(item.data.end),
        };
      });
      setLinks(newedges);
    }
  }, [nodes, edges]);
  const [selected, setSekected] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const graphRef = useRef<any>(null);
  useEffect(() => {
    graphRef.current?.selectNodes(selected);
  }, [selected]);
  const navigate = useNavigate();
  return (
    <CosmographProvider nodes={n} links={links}>
      <Loader open={isPending} handleClose={() => {}} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <AppBar position="static" sx={{ background: "#fafafa" }}>
          <Toolbar sx={{ gap: "16px", alignItems: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/")}
            >
              برگشت به خانه
              <ArrowBackIcon />
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() =>{}}
            >
              دانلود فایل خروجی
              <CloudDownloadIcon />
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                setIsPending(true);
                RotaryService.getAll()
                  .then((res) => {
                    setIsPending(false);
                    const newNodes: any[] = [];
                    const newEdgs: any[] = [];
                    if (res.data.result.length > 0) {
                      res.data.result.map((item: any) => {
                        newNodes.push({
                          id: item.startNode.id,
                          labels: item.startNode.labels,
                          ...item.startNode.properties,
                        });
                        newNodes.push({
                          id: item.endNode.id,
                          labels: item.endNode.labels,
                          ...item.endNode.properties,
                        });
                        newEdgs.push({
                          source: item.relationship.startNodeId,
                          target: item.relationship.endNodeId,
                        });
                      });
                    }

                    setNodes(newNodes as any[]);
                    setLinks(newEdgs as any[]);
                  })
                  .catch();
              }}
            >
              نشان دادن Rotary
            </Button>
            <Autocomplete
              size="small"
              options={["All", "Person", "Post", "Place"]}
              defaultValue={"All"}
              renderInput={(params) => (
                <TextField {...params} label="انتخاب ارتباط" />
              )}
              sx={{ width: "500px" }}
              onChange={(_event, value: any) => {
                if (value !== "All") {
                  setIsPending(true);
                  RelationshipService.getAll("HAS" + value.toUpperCase()).then(
                    (res) => {
                      setIsPending(false);
                      const newNodes: any[] = [];
                      const newEdgs: any[] = [];
                      if (res.data.result.length > 0) {
                        res.data.result.map((item: any) => {
                          newNodes.push({
                            id: item.startNode.id,
                            labels: item.startNode.labels,
                            ...item.startNode.properties,
                          });
                          newNodes.push({
                            id: item.endNode.id,
                            labels: item.endNode.labels,
                            ...item.endNode.properties,
                          });
                          newEdgs.push({
                            source: item.relationship.startNodeId,
                            target: item.relationship.endNodeId,
                          });
                        });
                      }

                      setNodes(newNodes as any[]);
                      setLinks(newEdgs as any[]);
                    }
                  );
                } else {
                  if (nodes.length > 0) {
                    const newNode = nodes.map((item) => {
                      return {
                        id: item.id,
                        ...item.data,
                      };
                    });
                    setNodes(newNode as any[]);
                    const newedges = edges.map((item: any) => {
                      return {
                        source: String(item.data.start),
                        target: String(item.data.end),
                      };
                    });
                    setLinks(newedges);
                  }
                }
              }}
            />
          </Toolbar>
        </AppBar>
        <CosmographSearch className="search" />
        <Cosmograph
          linkArrows={true}
          linkVisibilityDistanceRange={[0, 100]}
          linkArrowsSizeScale={2}
          linkWidth={2}
          nodeColor={(d: any) => d.color}
          onClick={(node, _event) => {
            if (node && node.id) {
              let x: { id: string }[] = [];
              links.forEach((item: { source: any; target: any }) => {
                if (item.source === node.id) {
                  x.push({ id: item.target });
                }
                if (item.target === node.id) {
                  x.push({ id: item.source });
                }
              });
              x.push({ ...node });
              setSekected(x as any);
            }
          }}
          linkColor={(link: any) => {
            return link.color;
          }}
          linkVisibilityMinTransparency={0.5}
          nodeGreyoutOpacity={0.1}
          ref={graphRef}
        />
      </div>
    </CosmographProvider>
  );
};
