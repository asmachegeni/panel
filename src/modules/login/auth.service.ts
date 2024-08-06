import Axios from "../../baseUrl";
const AuthService = {
  login(data: any) {
    return Axios.post("auth/signin", data);
  },
  async logout( ) {
    return Axios.post("auth/logout", {});
  },
};
export default AuthService;
