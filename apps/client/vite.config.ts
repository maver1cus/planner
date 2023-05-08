import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const IS_PROD = process.env.NODE_ENV === 'production';
const RULES_REGEXP = {
  svgComponents: /.svg$/,
};

const defineEnvVariables = (variables) =>
  variables.reduce(
    (accumulator, variable) => ({
      ...accumulator,
      [`process.env.${variable}`]: JSON.stringify(process.env[variable]),
    }),
    {}
  );

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    define: defineEnvVariables(['NODE_ENV', 'VITE_API_URL']),
    base: '/',
    publicDir: 'public',
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    css: {
      modules: {
        generateScopedName: IS_PROD
          ? '[hash:base64]'
          : '[name]__[local]__[hash:base64:5]',
      },
    },
    plugins: [
      tsconfigPaths(),
      react(),
      svgr({
        exportAsDefault: true,
        include: RULES_REGEXP.svgComponents,
        svgrOptions: {
          memo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      }),
    ],
  };
});
