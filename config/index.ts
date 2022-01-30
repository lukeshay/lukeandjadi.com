import { merge } from 'merge-anything';

import customEnvironmentVariables from './custom-environment-variables';
import defaultConfig from './default';
import developmentConfig from './development';
import productionConfig from './production';

const mergedConfig = merge(
  merge(defaultConfig, customEnvironmentVariables),
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig,
);

const nestedGet = (path: string, fullPath: string, config: any): any => {
  const i = path.indexOf('.');

  if (i === -1) {
    const value = config[path];

    if (!value) {
      throw new Error(`Config key ${fullPath} not found`);
    }

    return value;
  }

  const key = path.substring(0, i);
  const newPath = path.substring(i + 1);

  return nestedGet(newPath, fullPath, config[key]);
};

const get = (path: string): any => nestedGet(path, path, mergedConfig);


const config = {
  get,
};

export { config };
