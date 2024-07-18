import Axios from "../../baseUrl";
const AuthService = {
  login(data: any) {
    return Axios.post("auth/signin", data);
  },
  async logout(headers: any) {
    return Axios.post("auth/logout", {}, headers);
  },
};
export default AuthService;
