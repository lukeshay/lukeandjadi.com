import { RSVPAttributes } from '../types';
import Axios, { AxiosResponse } from 'axios';

Axios.defaults.baseURL = '/api';
Axios.defaults.withCredentials = true;

const rsvpSearchGet = (rsvp: any): Promise<AxiosResponse<RSVPAttributes, any>> => {
  return Axios.get<RSVPAttributes>('/rsvp/search', { params: rsvp });
};

const rsvpPut = (rsvp: any): Promise<AxiosResponse<RSVPAttributes, any>> => {
  return Axios.put<RSVPAttributes>('/rsvp', rsvp);
};

export { rsvpSearchGet, rsvpPut };
