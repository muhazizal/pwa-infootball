// Init
const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const PUBLIC_PATH = 'http://localhost:8080/';

// Exports
module.exports = {
	entry: './src/app.js',
	output: {
		filename: isDevelopment ? 'bundle.js' : 'bundle.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: PUBLIC_PATH,
	},
	module: {
		rules: [
			// HTML Loader
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					minimize: true,
				},
			},
			// To String Loader
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: '/styles/',
				use: ['to-string-loader', 'css-loader', 'sass-loader'],
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
					outputPath: path.join('assets', 'images'),
				},
			},
			// Fonts Loader
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							outputPath: path.join('assets', 'fonts'),
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
			favicon: './src/assets/icons/infootball-512.png',
		}),
		new SWPrecacheWebpackPlugin({
			cacheId: 'pwa-infootball-v1',
			filename: 'service-worker.js',
			staticFileGlobs: ['./src/index.html', './src/app.js', './src/assets/icons/**.*'],
			mergeStaticsConfig: true,
			minify: true,
			navigateFallback: PUBLIC_PATH + 'index.html',
			staticFileGlobsIgnorePatterns: [/\.map$/],
		}),
		new WebpackPwaManifest({
			name: 'PWA Infootball',
			short_name: 'Infootball',
			description: 'PWA about football information',
			background_color: '#f1f1f1',
			theme_color: '#f1f1f1',
			'theme-color': '#f1f1f1',
			ios: true,
			crossorigin: 'use-credentials',
			start_url: '/index.html',
			icons: [
				{
					src: path.resolve('./src/assets/icons/infootball-512.png'),
					sizes: [96, 128, 192, 256, 384, 512],
					destination: path.join('assets', 'icons'),
				},
			],
		}),
	],
};
