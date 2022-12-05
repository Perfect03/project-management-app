export interface UserAuthInfo {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  email: string;
}

export const storageUserAccInfo: UserAuthInfo = {
  message: '',
  token: '',
  refreshToken: '',
  userId: '',
  name: '',
  email: '',
};
