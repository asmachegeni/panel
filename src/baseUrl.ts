import axios from "axios";
const Axios = axios.create({
  baseURL: "http://192.168.251.217/api/",
});
export default Axios;
