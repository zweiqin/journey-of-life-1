'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,storage.set('@@', resolve('src/components'))
  },
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
			// '/shequ': {
			// 	target:'https://www.zhult.com/samrtWorker', // 接口的域名
			// 	// target:'http://192.168.0.63:8790/samrtWorker', // 接口的域名
			// 	// secure: false, // 如果是https，需要开启这个选项
			// 	changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
			// 	pathRewrite: {
			// 		'^/shequ': ''
			// 	}
			// },
			// '/tftf': {
			// 	target:'https://www.tuanfengkeji.cn:8098/dts-admin-api/admin', // 接口的域名
			// 	// secure: false, // 如果是https，需要开启这个选项
			// 	changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
			// 	pathRewrite: {
			// 		'^/tftf': ''
			// 	}
			// }
			'/api/third': {
				target:'https://www.zhult.com/samrtWorker', // 接口的域名
				// target:'http://192.168.0.61:8790/samrtWorker', // 接口的域名
				// secure: false, // 如果是https，需要开启这个选项
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				pathRewrite: {
					'^/api/third': '/api/third'
				}
			},
			'/static/tinymce4.7.5': {
				target:'https://www.tuanfengkeji.cn/tfshop', // 接口的域名
				// secure: false, // 如果是https，需要开启这个选项
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				pathRewrite: {
					'^/static/tinymce4.7.5': '/static/tinymce4.7.5'
				}
			},
			'/': {
				target:'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin', // 接口的域名
				// target:'https://www.tuanfengkeji.cn:8098/dts-admin-api/admin', // 接口的域名
				// target:'http://192.168.0.61:8083/demo/admin', // 接口的域名
				// secure: false, // 如果是https，需要开启这个选项
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
			}
		},
    https: false,
    // Various Dev Server settings

    // can be overwritten by process.env.HOST
    // if you want dev by ip, please set host: '0.0.0.0'
    host: 'localhost',
    // host: '192.168.0.33',
    port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    // devtool: 'cheap-source-map',
    devtool: 'eval-source-map',

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    assetsPublicPath: './',

    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build:prod --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    // `npm run build:prod --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}
