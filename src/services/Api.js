import axios from 'axios';
import * as URLS from '../utils/constants/urls';

// basic axios instance
const instance = axios.create({
  baseURL: URLS.BASE_URL,
  timeout: 1000,
  headers: {
    'Content-type': 'Application/json',
    Accept: 'Application/json',
  },
});

export const getEmployeesListAPI = () => instance.get(URLS.EMPLOYEES_LIST);
