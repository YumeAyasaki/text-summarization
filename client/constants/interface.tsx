// Text summarization type
export interface SummarizeRequest {
  message: string;
}

export interface Summarize {
  text: string;
}

export interface MassSummarizeRequest {
  message: string[];
}

export interface MassSummarize {
  text: string[];
}

// Hidden state type
export interface NLURequest {
  message: string;
}

export interface NLU {
  hidden_state: number[];
}

// Example type
export interface DataRequest {
  number: number;
  sample: number[];
}

export interface Data {
  idx: number[];
  text: string[];
  summary: string[];
}

export interface RelateRequest {
  idx: number;
}

export interface Information {
  index: number;
  text: string;
  summary: string;
}

export interface Relate {}

// Other
