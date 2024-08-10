import neo4j from "neo4j-driver";

const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "password";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export const fetchGraphData = async () => {
  console.log("her");
  const session = driver.session();
  try {
    const nodeWithRelation = await session.run(
      "match(n)-[r]->(m) return n,r,m"
    );
    const singelNode = await session.run(
      " MATCH (a) WHERE not ((a)-[]->()) and not (()-[]->(a)) RETURN a"
    );
    const nodes: { id: any; data: any }[] = [];
    const edges: any = [];
    nodeWithRelation.records.forEach((record) => {
      const sourceNode = record.get("n");
      const targetNode = record.get("m");
      const relation = record.get("r");
      nodes.push({
        id: sourceNode.identity.toString(),
        data: { ...sourceNode.properties, lables: sourceNode.labels },
      });
      nodes.push({
        id: targetNode.identity.toString(),
        data: { ...targetNode.properties, lables: targetNode.labels },
      });
      edges.push({
        id: relation.identity.toString(),
        data: {
          type: relation.type,
          start: relation.start.toString(),
          end: relation.end.toString(),
        },
      });
    });
    singelNode.records.forEach((record) => {
      const s = record.get("a");
      nodes.push({
        id: s.identity.toString(),
        data: { ...s.properties, lables: s.labels },
      });
    });
    console.log(edges);
    return { nodes, edges };
  } catch (error) {
    console.error("Neo4j query error:", error);
  } finally {
    await session.close();
  }
};

export const closeDriver = async () => {
  await driver.close();
};
// {
//   "identity": {
//       "low": 0,
//       "high": 0
//   },
//   "labels": [
//       "PERSON"
//   ],
//   "properties": {
//       "caller_id": "1000",
//       "name": "p1",
//       "email": "p1@gmail.com",
//       "lastname": "p1"
//   },
//   "elementId": "4:e6dbc2a6-2ec3-4a7a-a731-635ca6fb45ca:0"
// }
