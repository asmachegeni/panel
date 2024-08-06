import Axios from "../../baseUrl";

const RotaryService = {
  getAll() {
    return Axios.get("rotary");
  },
  add(data: { startNode: number; endNode: number }) {
    return Axios.post("rotary", data);
  },
  delete(id: any) {
    return Axios.delete(`rotary/${id}`);
  },
  get(id: any) {
    return Axios.get(`rotary/${id}`);
  },
};
export default RotaryService;
