import Axios from "../../baseUrl";

const PersonService = {
  getAll(pagenumbet: number) {
    return Axios.get(`person?page=${pagenumbet}`);
  },
  add(data: any) {
    return Axios.post("person", data);
  },
  update(data: any, id: number) {
    return Axios.put(`person/${id}`, data);
  },
  delete(id: any) {
    return Axios.delete(`person/${id}`);
  },
  get(id: any) {
    return Axios.get(`person/${id}`);
  },
};
export default PersonService;
