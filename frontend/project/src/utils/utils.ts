import { toast } from "react-toastify";

export const validatePassword = (password: string): boolean => {
  const isPassword: boolean = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/).test(password);

  if (!isPassword) {
    toast.info('Password must contain at least one letter and number.');
    return false;
  }
  return true;
};

export const generateRandomValue = (min:number, max: number, numAfterDigit = 0) => +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItems = <T>(items: T[]):T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

export const getRandomItem = <T>(items: T[]):T => items[generateRandomValue(0, items.length - 1)];
