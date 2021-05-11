import Axios from 'axios';
import { Account } from '../entities/user';

export function configureAPI() {
  Axios.defaults.baseURL = '/api';
  Axios.defaults.withCredentials = true;
}

export function accountSignInPost(email: string) {
  return Axios.post<{ email?: string; message?: string }>('/account/signin', {
    email,
  });
}

export function accountAuthPost(token: string) {
  return Axios.post<Account>('/account/auth', {
    token,
  });
}

export function accountPut(account: any) {
  return Axios.put<Account>('/account', account);
}
