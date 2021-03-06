const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		alias: {
			'@components': path.resolve(__dirname, '../src/components'),
			'@common': path.resolve(__dirname, '../src/components/common'),
			'@layout': path.resolve(__dirname, '../src/components/layout'),
			'@images': path.resolve(__dirname, '../src/assets/images'),
			'@actions': path.resolve(__dirname, '../src/store/actions'),
			'@reducers': path.resolve(__dirname, '../src/store/reducers'),
			'@helpers': path.resolve(__dirname, '../src/helpers')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(css|scss)$/,
				use: [
					ExtractCssChunks.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name]-[hash:8].[ext]'
					}
				}
			},
			{
				test: /\.(jpg|jpeg|gif|png|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name]-[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HTMLWebpackPlugin({
			template: './public/index.html'
		}),
		new ExtractCssChunks({
			filename: '[contenthash]-[name].css',
			chunkFilename: '[id].css',
			hot: true,
			orderWarning: true,
			reloadAll: true,
			cssModules: true
		})
	]
};
