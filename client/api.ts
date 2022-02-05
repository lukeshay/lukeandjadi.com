import type { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-named-as-default
import Axios from 'axios';

import type { RSVPAttributes } from '../types';

Axios.defaults.baseURL = '/api';
Axios.defaults.withCredentials = true;

const rsvpSearchGet = async (rsvp: Pick<RSVPAttributes, 'name'>): Promise<AxiosResponse<RSVPAttributes>> =>
  Axios.get<RSVPAttributes>('/rsvp/search', { params: rsvp });

const rsvpPut = async (rsvp: RSVPAttributes): Promise<AxiosResponse<RSVPAttributes>> =>
  Axios.put<RSVPAttributes>('/rsvp', rsvp);

export { rsvpSearchGet, rsvpPut };
