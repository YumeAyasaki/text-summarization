import { DataRequest, Data, RelateRequest } from '@/constants/interface';
import { configuredAxios } from './axios.config';

const getData = async (request: DataRequest): Promise<Data> => {
  const res = await configuredAxios.post('/api/data', request);
  return res.data;
};

const getRelate = async (request: RelateRequest): Promise<any> => {
  const res = await configuredAxios.post('/api/relate', request);
  return res.data;
};

export const ExampleAPI = {
  getData,
  getRelate,
};
