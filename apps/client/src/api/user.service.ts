import jwtDecode from "jwt-decode";
import {$host} from "./index";

export default class UserService {
  static async login(login: string, password: string) {
    const {data} = await $host.post('/login', {login, password});
    localStorage.setItem('token', data.token);

    return jwtDecode(data.token)
  }
}