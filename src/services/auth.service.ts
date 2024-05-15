import Axios from "../baseUrl";
const AuthService = {
  register(data: any) {
    return Axios.post("auth/signup", data);
  },
  login(data: any) {
    return Axios.post("auth/signin", data);
  },
  async logout(headers: any) {
    return Axios.post("auth/logout", {}, headers);
  },
};
export default AuthService;
