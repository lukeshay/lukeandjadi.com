import logger, { configureVercel } from '@lukeshay/logger';
import correlator from 'correlation-id';

configureVercel();

logger.defaultMeta = {
  ...logger.defaultMeta,
  get correlationId() {
    return correlator.getId() || '';
  },
};

export default logger;
