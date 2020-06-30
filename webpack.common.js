// Init
const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

// Url public path
const PUBLIC_PATH = 'http://localhost:8080/';

// Exports
module.exports = {
	entry: './src/app.js',
	output: {
		filename: isDevelopment ? 'bundle.js' : 'bundle.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: PUBLIC_PATH,
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			// HTML loader
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					minimize: true,
				},
			},
			// To string loader
			{
				test: /\.(sa|sc|c)ss$/,
				use: ['to-string-loader', 'css-loader', 'sass-loader'],
			},
			// Scss / Sass / Css loader
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					isDevelopment
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								options: {
									hmr: isDevelopment,
									reloadAll: true,
								},
						  },
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
			// File images loader
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: isDevelopment ? '[path][name].[ext]' : '[contenthash].[ext]',
					outputPath: path.join('assets', 'images'),
				},
			},
			// Fonts loader
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: isDevelopment ? '[path][name].[ext]' : '[contenthash].[ext]',
							outputPath: path.join('assets', 'fonts'),
						},
					},
				],
			},
			// Url loader
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
		// Clean webpack plugin
		new CleanWebpackPlugin({}),
		// Extract css plugin
		new MiniCssExtractPlugin({
			filename: isDevelopment ? 'bundle.css' : 'bundle.[hash].css',
			chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
		}),
		// HTML plugin
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			favicon: './src/assets/icons/infootball-512.png',
			scriptLoading: 'defer',
			hash: true,
		}),
		// Service worker precache plugin
		new SWPrecacheWebpackPlugin({
			cacheId: 'pwa-infootball',
			filename: 'service-worker.js',
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			minify: true,
			navigateFallback: PUBLIC_PATH + 'index.html',
			mergeStaticsConfig: true,
			staticFileGlobsIgnorePatterns: [/\.map$/],
		}),
		// Pwa manifest plugin
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
