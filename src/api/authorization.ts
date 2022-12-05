import axios, { AxiosError } from 'axios';
import { IUserAuth } from 'interfaces/api';
import { setCookie } from 'api/cokie';

export const baseUrl = 'https://project-management-backend.up.railway.app/';

class AuthorizationApi {
  url = baseUrl;
  constructor() {}

  async SignUp(user: IUserAuth) {
    try {
      const url = this.url + 'auth/signup';
      await axios.post(url, user);
    } catch (error) {
      throw error;
    }
  }

  async SignIn(user: IUserAuth) {
    try {
      const url = this.url + 'auth/signin';
      const response = await axios.post(url, user);
      setCookie('token', response.data.token, 30);
      return response.data.token;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthorizationApi();
