import Axios from "../../baseUrl";

const PositionsService = {
  getAll(pagenumbet: number, headers: any) {
    return Axios.get(`post?page=${pagenumbet}`, headers);
  },
  add(data: any, headers: any) {
    return Axios.post("post", data, headers);
  },
  update(data: any, id: number, headers: any) {
    return Axios.put(`post/${id}`, data, headers);
  },
  delete(id: any, headers: any) {
    return Axios.delete(`post/${id}`, headers);
  },
  get(id: any, headers: any) {
    return Axios.get(`post/${id}`, headers);
  },
};
export default PositionsService;
