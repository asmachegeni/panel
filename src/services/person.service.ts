import Axios from "../baseUrl";

const PersonService = {
  getAll(headers: any) {
    return Axios.get("person", headers);
  },
  add(data: any, headers: any) {
    return Axios.post("person", data, headers);
  },
  update(data: any, headers: any) {
    return Axios.patch("person", data, headers);
  },
  delete(id: any, headers: any) {
    return Axios.delete(`person/${id}`, headers);
  },
  get(id: any, headers: any) {
    return Axios.get(`person/${id}`, headers);
  },
};
export default PersonService;
