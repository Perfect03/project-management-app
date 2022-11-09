import axios from 'axios';
import { IUserAuth } from 'interfaces/api';

export const mainUrl = 'https://project-management-backend.up.railway.app/';

class Authorization {
  url = mainUrl;

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
    const url = this.url + 'auth/signin';
    const response = await axios.post(url, user);
    return response.data.token;
  }
}

export default new Authorization();
