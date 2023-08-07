import { toast } from "react-toastify";

export const validatePassword = (password: string): boolean => {
  const isPassword: boolean = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/).test(password);

  if (!isPassword) {
    toast.info('Password must contain at least one letter and number.');
    return false;
  }
  return true;
};