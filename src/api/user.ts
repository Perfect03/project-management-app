import axios from 'axios';
import { mainUrl } from './authorization';

class User {
  url = mainUrl;

  async getAllUsers(token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'users';
    const response = await axios.get(url, config);
    return response.data;
  }

  async getUserById(id: string, token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'users/' + id;
    const response = await axios.get(url, config);
    return response.data;
  }
}

export default new User();
