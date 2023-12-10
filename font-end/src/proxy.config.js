import { API_CONFIG } from './app/config/api.config.ts';

const proxy = [
    {
      context: '/api',
      target: `${API_CONFIG}`,
      secure: false,
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;