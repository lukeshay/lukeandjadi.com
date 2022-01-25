import { RSVPAttributes } from '@/types';
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

export function rsvpSearchGet(rsvp: any) {
  return Axios.get<RSVPAttributes>('/rsvp/search', { params: rsvp });
}

export function rsvpPut(rsvp: any) {
  return Axios.put<RSVPAttributes>('/rsvp', rsvp);
}
