import axios from 'axios';
import { IUserSignUp } from 'interfaces/api';

export const mainUrl = 'https://project-management-backend.up.railway.app/';

class Authorization {
  url = mainUrl;

  constructor() {}

  SignIn(user: IUserSignUp) {
    const url = this.url + 'auth/signup';
    axios
      .post(url, user)
      .then(function () {
        console.log('User registred');
      })
      .catch((error) => {
        if (error.response.status === 409) console.log('User is already existed');
      });
  }
}

export default new Authorization();
