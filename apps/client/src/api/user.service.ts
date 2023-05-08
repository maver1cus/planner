import { $host } from './index';

export default class UserService {
  static async login(login: string, password: string) {
    return await $host.post('/login', { login, password });
  }

  static async registration(login: string, password: string) {
    return await $host.post('/registration', { login, password });
  }
}
