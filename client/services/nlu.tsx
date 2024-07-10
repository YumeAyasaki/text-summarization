import { configuredAxios } from './axios.config';
import { NLURequest, NLU } from '@/constants/interface';

const getNLU = async (request: NLURequest): Promise<NLU> => {
  const res = await configuredAxios.post('/api/nlu', request);
  return res.data;
};

export const NLUAPI = {
  getNLU,
};
