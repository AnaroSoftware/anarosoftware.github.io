import axios, { type AxiosResponse } from 'axios';
import type { QuestionType } from './types';

type ResponseType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  isSuccess?: boolean | undefined;
  isError?: boolean | undefined;
  errorMessage?: string | undefined;
  status?: number | undefined;
};

const requestWrapper = async (fn: () => Promise<AxiosResponse>): Promise<ResponseType> => {
  try {
    const response = await fn();
    const isSuccess = response.status >= 200 && response.status < 300;

    return {
      data: response.data,
      isSuccess,
      isError: !isSuccess,
      errorMessage: !isSuccess ? response.statusText : undefined,
      status: response.status,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isError: true,
      errorMessage: 'Something went wrong',
    };
  }
};

export const sendQuestion = async (payload: QuestionType): Promise<ResponseType> => {
  return requestWrapper(() => axios.post(import.meta.env.VITE_FORMSPREE_URL, payload));
};
