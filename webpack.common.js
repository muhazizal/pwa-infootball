// Init
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const isDevelopment = process.env.NODE_ENV === 'development';

// Exports
module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			// HTML Loader
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			// SCSS / SASS / CSS Loader
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('node-sass'),
							sassOptions: {
								fiber: false,
							},
						},
					},
				],
			},
			// File Images Loader
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
					outputPath: 'images',
				},
			},
			// Fonts Loader
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts',
						},
					},
				],
			},
			// URL Loader
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
						},
					},
				],
			},
		],
	},
	plugins: [
		// Clean Webpack Plugin
		new CleanWebpackPlugin(),
		// Extract CSS Plugin
		new MiniCssExtractPlugin({
			filename: isDevelopment ? 'bundle.css' : 'bundle.[hash].css',
			chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
		}),
		// HTML Plugin
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
		new webpack.ProvidePlugin({
			'materialize-css': 'materialize-css/dist/css/materialize.min.css',
		}),
	],
};
