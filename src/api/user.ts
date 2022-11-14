import axios from 'axios';
import store from 'helpers/redux/store';
import { IGetAllUsers, IUserAuth } from 'interfaces/api';
import { IGetState } from 'interfaces/redux';
import { getCookie } from './cokie';

class UserApi {
  url = 'https://project-management-backend.up.railway.app/';

  state = store.getState() as IGetState;
  id = this.state.userData.user.id;

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

  async getUserInfo(login: string) {
    const users = (await this.getAllUsers()) as IGetAllUsers;
    const findedUser = users.find((el) => {
      return el.login === login;
    });
    return findedUser;
  }

  async getUserById() {
    const url = this.url + 'users/' + this.id;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserById(user: IUserAuth) {
    const url = this.url + 'users/' + this.id;
    try {
      const response = await axios.put(url, user, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserById() {
    const url = this.url + 'users/' + this.id;
    try {
      const response = await axios.delete(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserApi();
