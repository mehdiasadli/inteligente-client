import axios from 'axios';
import { addInterceptor, base, requestHeaders } from '..';
import { FieldType } from '../../components/CreateField';
import { Field, PopulatedField } from '../../lib/types';

const api = axios.create({
  baseURL: base + '/fields',
  headers: requestHeaders
});

api.interceptors.request.use(addInterceptor);

export default {
  createField: async (data: FieldType) => await api.post<Field>('/', data),
  getFields: async () => await api.get<PopulatedField[]>('/'),
};
