import { Bounce, toast } from "react-toastify";
import Axios from "../baseUrl";

const FilesService = {
  getAllExcel(): Promise<any> {
    return Axios.get("excel/");
  },
  async delete(id: number) {
    return Axios.delete(`excel/${id}`).then((res: any) => {
      if (res.ok) {
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
      if (res.ok) {
        toast.success("ّبا موفقیت آپدیت شد!", {
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
};

export default FilesService;
