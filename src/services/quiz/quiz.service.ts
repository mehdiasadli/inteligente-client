import axios from 'axios';
import { addInterceptor, base, requestHeaders } from '..';
import { Quiz } from '../../lib/types';

const api = axios.create({
  baseURL: base + '/quiz',
  headers: requestHeaders,
});

api.interceptors.request.use(addInterceptor);

export default {
  startQuiz: async (data: any) => await api.post<Quiz>('/', data),
  endQuiz: async ({ id, data }: { id: string; data: any }) => await api.put<Quiz>('/' + id, data),
  getQuiz: async ({ id }: { id: string }) => await api.get<Quiz>('/' + id),
  getQuizes: async () => await api.get<Quiz[]>('/'),
  getBoard: async ({ field, subfield }: { field: string; subfield?: string }) =>
    await api.get<Quiz[]>('/board', {
      params: {
        field,
        subfield,
      },
    }),
  deleteQuiz: async ({ id }: { id: string }) => await api.delete<{ message: string }>('/' + id),
  getAverage: async () =>
    await api.get<{ username: string; average: number; total: number }[]>('/average'),
};
