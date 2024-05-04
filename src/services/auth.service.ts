import { Bounce, toast } from "react-toastify";
import Axios from "../baseUrl";
const AuthService = {
  register(data: any) {
    Axios.post("auth/signup", data).then(() =>
      toast.success("ثبت نام شما با موفقیت انجام شد!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    );
  },
  login(data: any) {
    Axios.post("auth/signin", data).then((res: any) => {
      if (!res.data.errors) {
        toast.success("با موفقیت وارد شدید!", {
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
      } else {
        toast.error("نام کاربری یا رمز عبور اشتباه است.", {
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
  async logout() {
    return Axios.get("auth/logout").then(() =>
      toast.success("ّبا موفقیت خارج شد!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    );
  },
};
export default AuthService;
