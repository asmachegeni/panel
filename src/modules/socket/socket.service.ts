import Axios from "../../baseUrl";

const SocketService = {
  getAll(pagenumbet: number) {
    return Axios.get(`socket?page=${pagenumbet}`);
  },
  add(data: any) {
    return Axios.post("socket", data);
  },
  update(data: any, id: number) {
    return Axios.put(`socket/${id}`, data);
  },
  delete(id: any) {
    return Axios.delete(`socket/${id}`);
  },
  get(id: any) {
    return Axios.get(`socket/${id}`);
  },
};
export default SocketService;
