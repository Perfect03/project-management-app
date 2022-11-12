import axios from 'axios';
import { IUserAuth } from 'interfaces/api';
import { baseUrl } from './authorization';

class UserApi {
  url = baseUrl;

  async getAllUsers(token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'users';
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: string, token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'users/' + id;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserById(id: string, token: string, user: IUserAuth) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'users/' + id;
    try {
      const response = await axios.put(url, user, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserById(id: string, token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'users/' + id;
    try {
      const response = await axios.delete(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserApi();
