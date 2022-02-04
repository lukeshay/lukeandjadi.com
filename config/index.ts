import process from 'node:process';

import { merge } from 'merge-anything';

import customEnvironmentVariables from './custom-environment-variables';
import defaultConfig from './default';
import developmentConfig from './development';
import productionConfig from './production';

const mergedConfig = merge(
  merge(defaultConfig, customEnvironmentVariables),
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig,
);

const nestedGet = (
  path: string,
  fullPath: string,
  config: Record<string, unknown>,
): Record<string, unknown> | boolean | number | string | undefined => {
  const i = path.indexOf('.');

  if (i === -1) {
    const value = config[path];

    if (!value) {
      throw new Error(`Config key ${fullPath} not found`);
    }

    return value as Record<string, unknown> | boolean | number | string | undefined;
  }

  const key = path.slice(0, Math.max(0, i));
  const newPath = path.slice(Math.max(0, i + 1));

  return nestedGet(newPath, fullPath, config[key] as Record<string, unknown>);
};

const get = (path: string): Record<string, unknown> | boolean | number | string | undefined =>
  nestedGet(path, path, mergedConfig);

const config = {
  get,
};

export { config };
