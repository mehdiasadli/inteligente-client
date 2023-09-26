import axios from 'axios';
import { User } from '../../lib/types';
import { addInterceptor, base, requestHeaders } from '../index';

const api = axios.create({
  baseURL: base + '/users',
  headers: requestHeaders,
});

api.interceptors.request.use(addInterceptor);

export default {
  getUsers: async (data: any) => await api.get<User[]>('/', data),
  getUser: async ({ id }: { id: string }) => await api.get<User>('/' + id),
  updateUser: async ({ id, data }: { id: string; data: any }) =>
    await api.put<User>('/' + id, data),
  deleteUser: async ({ id }: { id: string }) => await api.delete<{ message: string }>('/' + id),
  changeRole: async ({ id, data }: { id: string; data: any }) => await api.put('/role/' + id, data),
};
