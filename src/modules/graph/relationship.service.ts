import Axios from "../../baseUrl";

const RelationshipService = {
  getAll(label: string) {
    return Axios.get(`relationship?label=${label}`);
  },
  add(data: { startNode: number; endNode: number; relationship: string }) {
    return Axios.post("relationship", data);
  },
  delete(id: any, label: string) {
    return Axios.delete(`relationship/${id}?label=${label}`);
  },
  get(id: any, label: string) {
    return Axios.get(`relationship/${id}?label=${label} `);
  },
};
export default RelationshipService;
