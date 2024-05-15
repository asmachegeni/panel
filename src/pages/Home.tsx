import { GraphCanvas } from "reagraph";

export const Home = () => {
  const nodes = [
    {
      id: "1",
      label: "1",
    },
    {
      id: "2",
      label: "2",
    },
  ];

  const edges = [
    {
      source: "1",
      target: "2",
      id: "1-2",
      label: "1-2",
    },
    {
      source: "2",
      target: "1",
      id: "2-1",
      label: "2-1",
    },
  ];

  return (
    <div style={{ position: "fixed", width: "750px", height: "750px" }}>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        contextMenu={({ data, onClose }) => (
          <div
            style={{
              background: "white",
              width: 150,
              border: "solid 1px blue",
              borderRadius: 2,
              padding: 5,
              textAlign: "center",
            }}
          >
            <h1>{data.label}</h1>
            <button onClick={onClose}>Close Menu</button>
          </div>
        )}
      />
    </div>
  );
};
