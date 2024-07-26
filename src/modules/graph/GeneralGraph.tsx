import {
  Cosmograph,
  CosmographProvider,
  CosmographSearch,
} from "@cosmograph/react";
import { useEffect, useMemo, useRef, useState } from "react";

export const GeneralGraph = () => {
  
  const [nodes, setNodes] = useState(() => {
    let t = [];
    for (let index = 0; index < 10000; index++) {
      t.push({ id: `node${index + 1}`, color: "#fff" });
    }
    return t;
  });
  const [links, setLinks] = useState(() => {
    let t = [];
    for (let index = 0; index < 5000; index++) {
      t.push({
        source: `node${index + 1}`,
        target: `node${index + 2}`,
        color: "#6666",
      });
    }
    return t;
  });
  const l = useMemo(() => links, [links]);
  const [selected, setSekected] = useState([]);
  const graphRef = useRef(null);
  useEffect(() => {
    console.log(selected);
    graphRef.current?.selectNodes(selected);
  }, [selected]);
  return (
    <CosmographProvider nodes={nodes} links={l}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <CosmographSearch className="search" />
        <Cosmograph
          linkArrows={false}
          linkVisibilityDistanceRange={[10, 100]}
          linkWidth={5}
          nodeColor={(d: any) => d.color}
          onClick={(node, event) => {
            if (node && node.id) {
              let x: { id: string }[] = [];
              links.forEach((item) => {
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
          linkVisibilityMinTransparency={0.1}
          nodeGreyoutOpacity={0.1}
          ref={graphRef}
        />
      </div>
    </CosmographProvider>
  );
};
