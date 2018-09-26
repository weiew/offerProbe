module.exports = {
    proxyList: {
        '/detect':{
            target: 'http://detect.those1.com',
            changeOrigin:true,
            pathRewrite:{
              '^/detect':'/'
            }
        },
        '/ips':{
            target: 'http://ips.those1.com',
            changeOrigin:true,
            pathRewrite:{
              '^/ips':'/'
            }
        }
    }
}
