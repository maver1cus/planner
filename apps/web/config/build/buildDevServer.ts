import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { BuildOptions } from './types/config';

export function buildDevServer({ port, proxy}: BuildOptions): DevServerConfiguration {
  return {
    port,
    proxy,
    historyApiFallback: true,
  }
}
