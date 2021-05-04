import Axios from 'axios';

export function configureAPI() {
  Axios.defaults.baseURL = '/api';
  Axios.defaults.withCredentials = true;
}

export function accountSignInPost(email: string) {
  return Axios.post<{ email?: string; message?: string }>('/account/signin', {
    email,
  });
}
