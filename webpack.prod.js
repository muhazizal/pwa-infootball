// Init
const merge = require('webpack-merge');
const common = require('./webpack.common');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Export
module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
			// Chain eslint and babel loader
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
		minimize: true,
		minimizer: [
			// Minify js plugin
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				include: '/src/app.js',
				exclude: '/node_modules/',
				cache: true,
				parallel: true,
				sourceMap: true,
				extractComments: true,
			}),
			// Minify css plugin
			new OptimizeCSSAssetsPlugin({}),
		],
	},
});
