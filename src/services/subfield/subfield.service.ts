import axios from 'axios';
import { addInterceptor, base, requestHeaders } from '..';
import { SubfieldType } from '../../components/CreateSubfield';
import { Subfield } from './../../lib/types';

const api = axios.create({
  baseURL: base + '/subfields',
  headers: requestHeaders,
});

api.interceptors.request.use(addInterceptor);

export default {
  createSubfield: async (data: SubfieldType) => await api.post<Subfield>('/', data),
  getSubfields: async (fieldId: string) => await api.get<Subfield[]>('/field/' + fieldId),
};
