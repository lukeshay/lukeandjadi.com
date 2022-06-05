import {XIcon, CheckIcon} from '@heroicons/react/outline';
import {useState} from 'react';

import type {SerializedRSVPAttributes} from '../../types';

type RSVPTableRowProps = SerializedRSVPAttributes;

const RSVPTableRow = ({changed, email, guests, id, maxGuests, name, variants}: RSVPTableRowProps): JSX.Element => {
    const [open, setOpen] = useState(false);

    const handleClick = (): void => {
        setOpen(!open);
    };

    return (
        <button className="w-full cursor-pointer border text-left" onClick={handleClick} type="button">
            <div className="grid grid-cols-10 gap-2" key={id}>
                <p className="col-span-3 truncate p-2">{name}</p>
                <p className="col-span-1 flex items-center justify-center p-2">
                    {changed ? (
                        <CheckIcon className="text-green-500" height={20} width={20} />
                    ) : (
                        <XIcon className="text-red-500" height={20} width={20} />
                    )}
                </p>
                <p className="col-span-3 p-2 text-center">{email ?? 'Not set'}</p>
                <p className="col-span-1 p-2 text-center">{guests}</p>
                <p className="col-span-2 p-2 text-center">{maxGuests}</p>
            </div>
            {open && (
                <div className="w-full px-4 pb-4 text-left">
                    <p>
                        <strong>{'Variations:'}</strong>
                    </p>
                    <ul className="list-disc pl-4">
                        {variants.map((variant) => (
                            <li key={variant.id}>{variant.variant}</li>
                        ))}
                    </ul>
                </div>
            )}
        </button>
    );
};

export type {RSVPTableRowProps};
export default RSVPTableRow;
