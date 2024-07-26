import Axios from "../../baseUrl";

const SocketService = {
  getAll(pagenumbet: number, headers: any) {
    return Axios.get(`socket?page=${pagenumbet}`, headers);
  },
  add(data: any, headers: any) {
    return Axios.post("socket", data, headers);
  },
  update(data: any, id: number, headers: any) {
    return Axios.put(`socket/${id}`, data, headers);
  },
  delete(id: any, headers: any) {
    return Axios.delete(`socket/${id}`, headers);
  },
  get(id: any, headers: any) {
    return Axios.get(`socket/${id}`, headers);
  },
};
export default SocketService;
