import type { BuildOptions } from './types/config';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export function buildDevServer({
  port,
  proxy,
}: BuildOptions): DevServerConfiguration {
  return {
    port,
    proxy,
    historyApiFallback: true,
    hot: true,
  };
}
