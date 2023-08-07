import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const StatusCodeMapping: number[] = [StatusCodes.BAD_REQUEST, StatusCodes.NOT_FOUND, StatusCodes.SERVICE_UNAVAILABLE];

const BACKEND_URL = 'http://localhost:4000/api';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && StatusCodeMapping.includes(error.response.status)) {
        toast.warn(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
