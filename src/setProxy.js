import { createProxyMiddleware } from 'http-proxy-middleware';
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://106.15.196.84:4000',
            changeOrigin: true,
            pathRewrite(path) {
                return path.replace('/api', '');
            },
        }),
    );
};
