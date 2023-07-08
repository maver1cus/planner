import path from 'path';
import type { Configuration } from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import type { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'dist'),
        html: path.resolve(__dirname, 'public', 'index.html'),
    }

    const mode = env.mode || 'development';
    const isDev = mode === 'development';
    const port = env.port || 3000;
    const proxy = {
        '/api': 'http://localhost:3001'
    }

    const config: Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        proxy,
        port
    })

    return config
};
