import Axios from "../../baseUrl";

const PersonService = {
  getAll(pagenumbet: number, headers: any) {
    return Axios.get(`person?page=${pagenumbet}`, headers);
  },
  add(data: any, headers: any) {
    return Axios.post("person", data, headers);
  },
  update(data: any, id: number, headers: any) {
    return Axios.put(`person/${id}`, data, headers);
  },
  delete(id: any, headers: any) {
    return Axios.delete(`person/${id}`, headers);
  },
  get(id: any, headers: any) {
    return Axios.get(`person/${id}`, headers);
  },
};
export default PersonService;
