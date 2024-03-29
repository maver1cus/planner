import * as path from 'path';
import type { Configuration } from 'webpack';
import { buildWebpackConfig } from './config/build/build-webpack-config';
import type { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv): Configuration => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'dist'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  const mode = env.mode || 'development';
  const isDev = mode === 'development';
  const port = env.port || 3000;
  const proxy = {
    '/api': 'http://localhost:3001',
  };

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    proxy,
    port,
  });
};
