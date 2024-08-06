import neo4j from "neo4j-driver";

const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "password";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export const fetchGraphData = async () => {
  const session = driver.session();
  try {
    const result = await session.run("MATCH (n) RETURN n");
    const nodes: { id: any; data: any }[] = [];
    const edges: { id: any; source: any; target: any; label: any }[] = [];

    result.records.forEach((record) => {
      const node1 = record.get("n");
      // const node2 = record.get("m");
      // const edge = record.get("r");
      nodes.push({
        id: node1.identity.toString(),
        data: { ...node1.properties, lables: node1.labels },
      });
    });

    result.records.forEach((record) => {
      const node1 = record.get("n");
      console.log(node1);

    });

    // nodes.push({
    //   id: node2.identity.toString(),
    //   data: { ...node2.properties, lables: node2.labels },
    // });
    // edges.push({
    //   id: edge.identity.toString(),
    //   source: node1.identity.toString(),
    //   target: node2.identity.toString(),
    //   label: edge.type,
    // });

    return nodes;
  } catch (error) {
    console.error("Neo4j query error:", error);
  } finally {
    await session.close();
  }
};

export const closeDriver = async () => {
  await driver.close();
};
