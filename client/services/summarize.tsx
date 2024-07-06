import { configuredAxios } from "./axios.config";

interface SummarizeRequest {
    message: string;
}

interface Summarize {
    text: string;
    hidden_state: number[];
}

interface MassSummarizeRequest {
    message: string[];
}

interface MassSummarize {
    text: string[];
    hidden_state: number[][];
}

const getOneSummarize = async (request: SummarizeRequest): Promise<Summarize> => {
    const res = await configuredAxios.post("/api/summarize", request);
    return res.data;
}

const getMassSummarize = async (request: MassSummarizeRequest): Promise<MassSummarize> => {
    const res = await configuredAxios.post("/api/summarizes", request);
    return res.data;
}

export const SummarizeAPI = {
    getOneSummarize,
    getMassSummarize
  };