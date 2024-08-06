import { Bounce, toast } from "react-toastify";
import Axios from "../../baseUrl";

const FilesService = {
  getAllExcel(pageNumber: number): Promise<any> {
    return Axios.get(`excel?page=${pageNumber || 1}`);
  },
  async delete(id: number) {
    return Axios.delete(`excel/${id}`).then((res: any) => {
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
  async update(id: number, data: any) {
    return Axios.put(`excel/${id}`, data).then((res: any) => {
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
  async download(id: number) {
    return Axios.get(`excel/${id}`);
  },
  post(data: any) {
    return Axios.post(`excel`, data);
  },
};

export default FilesService;
