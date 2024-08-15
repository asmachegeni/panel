import axios from "axios";
import { useContext } from "react";
const Axios = axios.create({
  baseURL: "http://localhost:7000/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export default Axios;
