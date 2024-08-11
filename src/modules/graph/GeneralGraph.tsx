import {
  Cosmograph,
  CosmographProvider,
  CosmographSearch,
} from "@cosmograph/react";
import { useEffect, useRef, useState } from "react";

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
  const graphRef = useRef<any>(null);
  useEffect(() => {
    graphRef.current?.selectNodes(selected);
  }, [selected]);
  return (
    <CosmographProvider nodes={n} links={links}>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
