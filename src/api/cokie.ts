import axios from 'axios';
import { storageUserAccInfo } from '../components/utils/storage';
export const baseUrl = 'https://rs-lang-team-38.herokuapp.com/';

export const setCookie = (cname: string, cvalue: string, exdays?: number) => {
  const d = new Date();
  if (exdays) d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

const getUserByCookie = async (userId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const response = await axios.get(`${baseUrl}users/${userId}`, config);
    console.log(response.statusText);
    storageUserAccInfo.name = response.data.name;
    storageUserAccInfo.email = response.data.email;
    storageUserAccInfo.token = token;
    storageUserAccInfo.userId = userId;
    storageUserAccInfo.message = 'Authenticated';
  } catch (error) {
    console.error(error);
  }
};

export const deleteCookie = (cname1: string, cname2: string) => {
  setCookie(cname1, '');
  setCookie(cname2, '');
};
