import axios from 'axios';
import { addInterceptor, base } from '..';
import { PopulatedQuestion } from './../../lib/types';

const api = axios.create({
  baseURL: base + '/questions',
});

api.interceptors.request.use(addInterceptor);

export default {
  createQuestion: async (data: any) => await api.post('/', data),
  updateQuestion: async ({ id, data }: { id: string; data: any }) => await api.put('/' + id, data),
  deleteQuestion: async ({ id }: { id: string }) => await api.delete<{ message: string }>('/' + id),
  getCount: async () => await api.get<{ count: number }>('/count'),
  getQuestions: async ({ field, subfield }: { field: string; subfield: string }) =>
    await api.get<PopulatedQuestion[]>('/', {
      params: {
        field,
        subfield,
      },
    }),
};
