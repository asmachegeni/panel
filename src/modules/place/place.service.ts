import Axios from "../../baseUrl";

const PlaceService = {
  getAll(pagenumbet: number, headers: any) {
    return Axios.get(`place?page=${pagenumbet}`, headers);
  },
  add(data: any, headers: any) {
    return Axios.post("place", data, headers);
  },
  update(data: any, id: number, headers: any) {
    return Axios.patch(`place/${id}`, data, headers);
  },
  delete(id: any, headers: any) {
    return Axios.delete(`place/${id}`, headers);
  },
  get(id: any, headers: any) {
    return Axios.get(`place/${id}`, headers);
  },
};
export default PlaceService;
