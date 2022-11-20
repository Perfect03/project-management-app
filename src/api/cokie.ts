import UserApi from 'api/user';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { storageUserAccInfo } from '../components/utils/storage';
import { baseUrl } from './authorization';
import { isAuthReducer, userReducer } from 'helpers/redux/userDataSlice';
import { IGetUser } from 'interfaces/api';
//import { setAuth } from 'components/forms/setAuth';

export const setCookie = (cname: string, cvalue: string, exdays?: number) => {
  const d = new Date();
  if (exdays) d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const getCookie = (cname: string) => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const checkCookie = (cname1: string, cname2: string) => {
  const login = getCookie(`${cname1}`);
  const token = getCookie(`${cname2}`);
  return login;
  /*console.log(login, token);
  if (login) {
    try {
      const user = await UserApi.getUserInfo(login);
      return user;
    } catch (error) {
      console.log('Connection error');
      return error;
    }
  } else {
    console.log('there is no cookie');
  }*/
};

const getUserByCookie = async (login: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseUrl}users/${login}`, config);
    console.log(response);
    storageUserAccInfo.name = response.data.name;
    storageUserAccInfo.email = response.data.email;
    storageUserAccInfo.token = token;
    storageUserAccInfo.userId = login;
    storageUserAccInfo.message = 'Authenticated';
  } catch (error) {
    console.error(error);
  }
};

export const deleteCookie = (cname1: string, cname2: string) => {
  setCookie(cname1, '');
  setCookie(cname2, '');
};
