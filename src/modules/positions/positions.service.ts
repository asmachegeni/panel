import Axios from "../../baseUrl";

const PositionsService = {
  getAll(pagenumbet: number) {
    return Axios.get(`post?page=${pagenumbet}`);
  },
  add(data: any) {
    return Axios.post("post", data);
  },
  update(data: any, id: number) {
    return Axios.put(`post/${id}`, data);
  },
  delete(id: any) {
    return Axios.delete(`post/${id}`);
  },
  get(id: any) {
    return Axios.get(`post/${id}`);
  },
};
export default PositionsService;
