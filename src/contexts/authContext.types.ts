export interface AuthType {
  isLogged: boolean;
  login: ()=>void;
  logout: ()=>void;
}
