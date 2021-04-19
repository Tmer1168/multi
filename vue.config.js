const Timestamp = new Date().getTime();
module.exports = {
    publicPath: "/multi/",

    // configureWebpack:{
    //     output: {
    //         // 输出重构【模块名称.hash值.时间戳】
    //         filename: `[name].[hash].${Timestamp}.js`,
    //         chunkFilename: `[name].[hash].${Timestamp}.js`
    //     },
    // },
    // devServer: {
    //     open: true, //是否自动弹出浏览器页面
    //     host: "localhost",
    //     port: '8080',
    //     https: false,
    //     hotOnly: false,
    //     proxy: {
    //         '/api': {
    //             target:'https://api.shasta.trongrid.io', //API服务器的地址
    //             ws: true,  //代理websockets
    //             changeOrigin: true, // 虚拟的站点需要更管origin
    //             pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
    //                 '^/api': '/'
    //             }
    //         }
    //     },
    // }
}
