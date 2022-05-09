export const rememberControl = () => {
  const userInStorage = localStorage.getItem('user');

  if (userInStorage) {
    sessionStorage.setItem('user', userInStorage);
    return true;
  } else {
    return false;
  }
};
