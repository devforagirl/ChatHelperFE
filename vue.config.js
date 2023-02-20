module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    disableHostCheck: true,
    proxy: {
      // 本地开发时使用的
      // '/socket.io': {
      //   // target: 'http://127.0.0.1:5000',
      //   // target: 'https://chat-helper-be-2.vercel.app', 
      //   target: 'https://nba.com',

      //   changeOrigin: true
      // }
    }
  }
}

// module.exports = {
//   transpileDependencies: [
//     'vuetify',
//   ],
//   // 关闭生产环境console
//   configureWebpack(config) {
//     if (process.env.NODE_ENV === 'production') {
//       config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
//     }
//   },
//   // To fix the "Invalid Host/Origin header" error
//   devServer: {
//     disableHostCheck: true
//   }
// };