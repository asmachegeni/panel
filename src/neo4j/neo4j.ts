import neo4j, { Integer } from "neo4j-driver";

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
    //   nodes.push({
    //     id: node2.identity.toString(),
    //     label: node2.properties.name,
    //   });
    //   edges.push({
    //     id: edge.identity.toString(),
    //     source: node1.identity.toString(),
    //     target: node2.identity.toString(),
    //     label: edge.type,
    //   });

    return nodes;
  } catch (error) {
    console.error("Neo4j query error:", error);
  } finally {
    await session.close();
  }
};

export const addEdge = async (
  source: string | number | bigint | Integer | { low: number; high: number },
  target: string | number | bigint | Integer | { low: number; high: number }
) => {
  const session = driver.session();
  try {
    const result = await session.run(
      "MATCH (a),(b) WHERE id(a) = $source AND id(b) = $target CREATE (a)-[r:RELATIONSHIP]->(b) RETURN r",
      { source: neo4j.int(source), target: neo4j.int(target) }
    );
    const edge = result.records[0].get("r");
    return { id: edge.identity.toString(), source, target, label: edge.type };
  } catch (error) {
    console.error("Neo4j add edge error:", error);
  } finally {
    await session.close();
  }
};

export const removeEdge = async (
  edgeId: string | number | bigint | Integer | { low: number; high: number }
) => {
  const session = driver.session();
  try {
    await session.run("MATCH ()-[r]->() WHERE id(r) = $edgeId DELETE r", {
      edgeId: neo4j.int(edgeId),
    });
  } catch (error) {
    console.error("Neo4j remove edge error:", error);
  } finally {
    await session.close();
  }
};

export const closeDriver = async () => {
  await driver.close();
};
