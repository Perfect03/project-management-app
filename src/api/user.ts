import axios from 'axios';
import store from 'helpers/redux/store';
import { IGetAllUsers, IUserAuth } from 'interfaces/api';
import { IGetState } from 'interfaces/redux';
import { getCookie } from './cokie';

class UserApi {
  url = 'https://project-management-backend.up.railway.app/';

  state = store.getState() as IGetState;
  id = this.state.userData.user.id;

  async getAllUsers() {
    const token = getCookie('token');

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

  async getUserInfo(login: string) {
    const users = (await this.getAllUsers()) as IGetAllUsers;
    const findedUser = users.find((el) => {
      return el.login === login;
    });
    this.id = findedUser!._id;
    return findedUser;
  }

  async getUserById() {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'users/' + this.id;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserById(user: IUserAuth) {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'users/' + this.id;
    try {
      const response = await axios.put(url, user, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserById() {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'users/' + this.id;
    try {
      const response = await axios.delete(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserApi();
