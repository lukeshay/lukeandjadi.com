import * as yup from 'yup';
import {StatusCodes} from '@lukeshay/next-router';

import {validate} from '../../../server/services/schema-service';
import type {Handler} from '../../../server/infrastructure/middleware';
import {requireSession, createRouter} from '../../../server/infrastructure/middleware';
import {getAllChangesByResource} from '../../../server/services/cdc-service';

const querySchema = yup.object().shape({
    resource: yup.string().required(),
});

const get: Handler = async (req, res) => {
    const {resource} = await validate(querySchema, req.query);

    const changes = await getAllChangesByResource(resource);

    res.status(StatusCodes.OK).json(changes);
};

export default createRouter().get(requireSession(get)).handler();
