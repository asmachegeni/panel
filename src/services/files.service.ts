import { Bounce, toast } from "react-toastify";
import Axios from "../baseUrl";

const FilesService = {
  getAllExcel(pageNumber: number, headers: any): Promise<any> {
    return Axios.get(`excel?page=${pageNumber || 1}`, headers);
  },
  async delete(id: number, headers: any) {
    return Axios.delete(`excel/${id}`, headers).then((res: any) => {
      if (res.status === 200) {
        toast.success("ّبا موفقیت حذف شد!", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    });
  },
  async update(id: number, data: any, headers: any) {
    return Axios.put(`excel/${id}`, data, headers).then((res: any) => {
      if (res.status === 200) {
        toast.success("با موفقیت آپدیت شد", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    });
  },
  async download(id: number, headers: any) {
    return Axios.get(`excel/${id}`, headers);
  },
  post(data: any, headers: any) {
    return Axios.post(`excel`, data, headers);
  },
};

export default FilesService;
