const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = env => {
 	return {
 		entry: ['whatwg-fetch', './js/index.js'],
 		output: {
 			path: resolve(__dirname, 'dist'),
 			filename: 'bundle.js',
 			publicPath: '/'
 		},
 		context: resolve(__dirname, 'src'),
 		devtool : env.prod ? 'source-map' : 'eval',
 		module: {
 			rules: [
 				{
 					test: /\.jsx?$/,
 					exclude: /(node_modules)/,
 					use: [
 						{
 							loader: 'babel-loader'
 						}
 					],
 				},
				{
 					test: /\.scss?$/,
 					exclude: /(node_modules)/,
 					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
 						use: [
 							{ loader: 'css-loader?sourcemap' },
 							{ loader: 'postcss-loader?sourceMap' },
 							{ loader: 'sass-loader?sourceMap' }
 						]
 					})
 				},
				{
          test: /\.(gif|png|jpg|woff|woff2|eot|ttf|otf|svg)(\?.*$|$)/,
					loader: 'url-loader?importLoaders=1&limit=10000&name=[path][name].[ext]',
        }
 			],
 		},
		plugins: [
			new ExtractTextPlugin({filename: 'styles/[name].css', disable: false, allChunks: true}),
			new BrowserSyncPlugin({ 
				host: 'localhost',
				port: '8000',
				proxy: 'http://localhost:8080'
			})
		]
 	}
};
