import axios from 'axios';
import { base, requestHeaders } from '..';
import { User } from '../../lib/types';
import { LoginType } from '../../pages/LoginPage';
import { RegisterType } from '../../pages/RegisterPage';

const api = axios.create({
  baseURL: base + '/auth',
  headers: requestHeaders,
});

export default {
  signup: async (data: RegisterType) => await api.post<User>('/signup', data),
  signin: async (data: LoginType) => await api.post<User>('/signin', data),
};
