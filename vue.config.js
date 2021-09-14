module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://backend-task-tracker0.herokuapp.com/',
                changeOrigin: true,
                logLevel: 'debug',
                //  pathRewrite: { '^/api': '/' },
            },
        },
    },
}