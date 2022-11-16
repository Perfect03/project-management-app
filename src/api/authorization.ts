import axios from 'axios';
import { IUserAuth } from 'interfaces/api';
import { setCookie } from 'api/cokie';
import UserApi from './user';
import { useDispatch } from 'react-redux';
import { isErrorUserData } from 'helpers/redux/userDataSlice';

export const baseUrl = 'https://project-management-backend.up.railway.app/';

class AuthorizationApi {
  url = baseUrl;
  constructor() {}

  SignUp(user: IUserAuth) {
    const url = this.url + 'auth/signup';
    axios
      .post(url, user)
      .then(function () {
        console.log('User is registered');
      })
      .catch((error) => {
        if (error.response.status === 409) console.log('User is already existed');
      });
  }

  async SignIn(user: IUserAuth) {
    try {
      const url = this.url + 'auth/signin';
      const response = await axios.post(url, user);
      setCookie('token', response.data.token, 30);
      return response.data.token;
    } catch (error) {
      return error;
    }
  }
}

export default new AuthorizationApi();
