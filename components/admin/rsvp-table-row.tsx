import { PencilIcon, XIcon, CheckIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import type { SerializedRSVPAttributes } from '../../types';

type RSVPTableRowProps = SerializedRSVPAttributes;

const RSVPTableRow = ({ changed, email, guests, id, maxGuests, name }: RSVPTableRowProps): JSX.Element => (
  <tr className="border-t p-2" key={id}>
    <td className="p-2">
      <ChevronRightIcon className="h-6 w-6 cursor-pointer text-gray-500" />
    </td>
    <td className="p-2">{name}</td>
    <td className="flex items-center justify-center p-2">
      {changed ? (
        <CheckIcon className="text-green-500" height={20} width={20} />
      ) : (
        <XIcon className="text-red-500" height={20} width={20} />
      )}
    </td>
    <td className="p-2 text-center">{email ?? 'Not set'}</td>
    <td className="p-2 text-center">{guests}</td>
    <td className="p-2 text-center">{maxGuests}</td>
    <td className="flex items-center justify-center p-2">
      <Link
        href={`/rsvp/edit/${id}?redirectURI=/account/rsvps&message=${name}'s RSVP has been updated!&autoClose=true`}
        passHref
        prefetch
      >
        <button className="cursor-pointer rounded-full p-2 text-gray-500 ring-accent-500 hover:ring" type="button">
          <PencilIcon height={20} width={20} />
        </button>
      </Link>
    </td>
  </tr>
);

export type { RSVPTableRowProps };
export default RSVPTableRow;
