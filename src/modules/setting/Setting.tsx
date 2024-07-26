import { Neo4jProvider } from "use-neo4j";
export const Setting = () => {
  return (
    <Neo4jProvider
      scheme="neo4j+s"
      host="myauradb.neo4j.io"
      port="7687"
      username="username"
      password="defaultpassword"
      database="mydb"
    >
      <>setting</>
    </Neo4jProvider>
  );
};
