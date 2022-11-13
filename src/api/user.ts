import axios from 'axios';
import { IUserAuth } from 'interfaces/api';
import { baseUrl } from './authorization';
import { getCookie } from './cokie';

class UserApi {
  url = baseUrl;

  token: string = getCookie('token');
  config = {
    headers: { Authorization: `Bearer ${this.token}` },
  };

  async getAllUsers() {
    const url = this.url + 'users';
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: string) {
    const url = this.url + 'users/' + id;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserById(id: string, user: IUserAuth) {
    const url = this.url + 'users/' + id;
    try {
      const response = await axios.put(url, user, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserById(id: string) {
    const url = this.url + 'users/' + id;
    try {
      const response = await axios.delete(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserApi();
