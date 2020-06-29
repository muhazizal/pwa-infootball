// Init
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Export
module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
					{
						loader: 'eslint-loader',
						options: {
							cache: true,
							fix: true,
							formatter: 'stylish',
							quiet: true,
							emitWarning: true,
						},
					},
				],
			},
		],
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				test: /\.js($|\?)/i,
				exclude: '/node_modules/',
				cache: true,
				parallel: true,
				sourceMap: true,
			}),
		],
	},
});
