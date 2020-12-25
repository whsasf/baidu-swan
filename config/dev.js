module.exports = {
    env: {
        NODE_ENV: '"development"',
    },
    defineConstants: {},
    mini: {},
    h5: {
        devServer: {
            proxy: {
                '/api/': {
                    target: 'http://api.dianbaobao.com/',
                    // target: ' http://sjgc35.3322.org:8090/',
                    pathRewrite: {
                        '^/api/': '/',
                    },
                    changeOrigin: true,
                    secure: true, // 设置支持https协议的代理
                },
                '/oss/': {
                    target: 'https://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/',
                    pathRewrite: {
                        '^/oss/': '/',
                    },
                    changeOrigin: true,
                    secure: true, // 设置支持https协议的代理
                },
            },
        },
    },
};
