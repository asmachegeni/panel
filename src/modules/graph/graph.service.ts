import Axios from "../../baseUrl";

const GraphService = {
  getAll(label: string, headers: any) {
    return Axios.get(`relationship?label=${label}`, headers);
  },
  add(
    data: {
      startNode: number;
      endNode: number;
      relationship: string;
    },
    headers: any
  ) {
    return Axios.post("relationship", data, headers);
  },
  update(data: any, id: number, headers: any) {
    return Axios.put(`relationship/${id}`, data, headers);
  },
  delete(id: any, headers: any) {
    return Axios.delete(`relationship/${id}`, headers);
  },
  get(id: any, label: string, headers: any) {
    return Axios.get(`relationship/${id}?label=${label}`, headers);
  },
};
export default GraphService;
