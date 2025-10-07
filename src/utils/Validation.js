export const validateEmail = (email) => {
  if (!email) return false;
  const re = /\S+@\S+\.\S+/;
  return re.test(email) ? true : false;
};

export const validatePassword = (password) => {
  if (!password) return false;
  if (password.length < 8) return false;
  return true;
};
