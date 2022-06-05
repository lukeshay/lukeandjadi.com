import type {AxiosResponse} from 'axios';
// eslint-disable-next-line import/no-named-as-default
import Axios from 'axios';

import type {RSVPAttributes, SerializedRSVPAttributes} from '../types';

Axios.defaults.baseURL = '/api';
Axios.defaults.withCredentials = true;

const rsvpSearchGet = async (
    rsvp: Pick<RSVPAttributes, 'name'> & {token: string}
): Promise<AxiosResponse<RSVPAttributes>> => Axios.get<RSVPAttributes>('/rsvp/search', {params: rsvp});

const rsvpPut = async (
    rsvp: Omit<RSVPAttributes, 'createdAt' | 'updatedAt' | 'variants'> & {token: string}
): Promise<AxiosResponse<SerializedRSVPAttributes>> => Axios.put<SerializedRSVPAttributes>('/rsvp', rsvp);

export {rsvpSearchGet, rsvpPut};
