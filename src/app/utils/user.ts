import { Bilgiler } from '../models/iuser';
import { decrypt } from './crypto';

export const userFunction = () => {
  const userInStorage = sessionStorage.getItem('user');

  if (userInStorage) {
    try {
      const user: Bilgiler = JSON.parse(decrypt(userInStorage));
      return user;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};
