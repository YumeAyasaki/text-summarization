import { configuredAxios } from './axios.config';
import {
  SummarizeRequest,
  Summarize,
  MassSummarizeRequest,
  MassSummarize,
} from '@/constants/interface';

const getOneSummarize = async (
  request: SummarizeRequest
): Promise<Summarize> => {
  const res = await configuredAxios.post('/api/summarize', request);
  return res.data;
};

const getMassSummarize = async (
  request: MassSummarizeRequest
): Promise<MassSummarize> => {
  const res = await configuredAxios.post('/api/summarizes', request);
  return res.data;
};

export const SummarizeAPI = {
  getOneSummarize,
  getMassSummarize,
};
