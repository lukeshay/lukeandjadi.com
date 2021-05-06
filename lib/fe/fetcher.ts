import Axios, { AxiosRequestConfig } from 'axios';

const fetcher = (url: string, config?: AxiosRequestConfig) =>
  Axios.get(url, config).then((res) => res.data);

export default fetcher;
