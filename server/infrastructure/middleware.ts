import {requireAuth} from '@clerk/nextjs/api';
import type {Router, Wrapper} from '@lukeshay/next-router';
import {router, StatusCodes} from '@lukeshay/next-router';
import correlator from 'correlation-id';
import type {NextApiHandler} from 'next';
import {v4} from 'uuid';

import {isAPIError, isError} from '../errors/api-error';
import {getStackTrace} from '../utils/error-util';

import logger from './logger';

type Handler = NextApiHandler;

const requireSession = (handler: Handler): Handler => requireAuth(handler) as unknown as Handler;

const withCorrelationId: Wrapper<Handler> = async (req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/require-await
    await correlator.withId(v4(), async (): Promise<unknown> => next(req, res));
};

const withErrorHandler: Wrapper<Handler> = async (req, res, next) => {
    try {
        // eslint-disable-next-line node/callback-return
        await next(req, res);
    } catch (error) {
        if (isAPIError(error)) {
            logger.info(`an error has occurred: ${error.message}`, {error});

            res.status(error.statusCode).json(error.toJSON());
        } else if (isError(error)) {
            logger.info(`an unknown error has occurred: ${error.message}`, {error});

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                name: error.name,
                stack: error.stack,
            });
        } else {
            logger.info('an unknown error has occurred', {
                error,
                stack: getStackTrace(error as object),
            });

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'an unknown error occurred'});
        }
    }
};

const wrapper: Wrapper<Handler> = async (req, res, handler) => {
    await withCorrelationId(req, res, async (nestedReq, nestedRes) => {
        logger.info(`received request: ${nestedReq.method ?? ''} ${nestedReq.url ?? ''}`, {
            body: nestedReq.body as Record<string, unknown>,
            httpVersionMajor: nestedReq.httpVersionMajor,
            httpVersionMinor: nestedReq.httpVersionMinor,
            method: nestedReq.method,
            query: nestedReq.query,
            url: nestedReq.url,
        });

        await withErrorHandler(nestedReq, nestedRes, handler);
    });
};

const createRouter = (): Router<Handler> => router<Handler>(wrapper);

export type {Handler};
export {requireSession, createRouter};
