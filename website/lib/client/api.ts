import Axios from 'axios';
import { Account } from '../entities/account';
import { RSVP } from '../entities/rsvp';

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

export function rsvpSearchGet(rsvp: any) {
  return Axios.get<RSVP>('/rsvp/search', { params: rsvp });
}

export function rsvpPut(rsvp: any) {
  return Axios.put<RSVP>('/rsvp', rsvp);
}
