import Axios from "../../baseUrl";

const PlaceService = {
  getAll(pagenumbet: number) {
    return Axios.get(`place?page=${pagenumbet}`);
  },
  add(data: any) {
    return Axios.post("place", data);
  },
  update(data: any, id: number) {
    return Axios.patch(`place/${id}`, data);
  },
  delete(id: any) {
    return Axios.delete(`place/${id}`);
  },
  get(id: any) {
    return Axios.get(`place/${id}`);
  },
};
export default PlaceService;
