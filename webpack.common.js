// Init
const isDevelopment = process.env.NODE_ENV === 'development';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

// Exports
module.exports = {
	entry: './src/app.js',
	output: {
		filename: isDevelopment ? 'bundle.js' : 'bundle.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
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
			// Images loader with file-loader
			{
				test: /\.(png|jpe?g|gif|svg|jp2|webp)$/i,
				loader: 'file-loader',
				options: {
					name: isDevelopment ? '[path][name].[ext]' : '[name].[contenthash].[ext]',
					outputPath: path.join('assets', 'images'),
					limit: 10000,
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
			favicon: './src/assets/icons/favicon.png',
		}),
		// Pwa manifest plugin
		new WebpackPwaManifest({
			name: 'PWA Infootball',
			short_name: 'Infootball',
			orientation: 'portrait',
			display: 'standalone',
			description: 'PWA about football information',
			background_color: '#f1f1f1',
			theme_color: '#f1f1f1',
			'theme-color': '#f1f1f1',
			ios: {
				'apple-mobile-web-app-title': 'Infootball',
				'apple-mobile-web-app-status-bar-style': 'black',
				'apple-mobile-web-app-capable': 'yes',
			},
			crossorigin: 'anonymous',
			start_url: '/index.html',
			icons: [
				{
					src: path.resolve('./src/assets/icons/favicon.png'),
					sizes: [96, 128, 192, 256, 384, 512],
					destination: path.join('assets', 'android'),
				},
				{
					src: path.resolve('./src/assets/icons/favicon.png'),
					sizes: [120, 152, 167, 180, 1024],
					destination: path.join('assets', 'ios'),
					ios: true,
				},
				{
					src: path.resolve('./src/assets/icons/favicon.png'),
					sizes: 1024,
					destination: path.join('assets', 'ios'),
					ios: 'startup',
				},
			],
		}),
		// Service worker webpack plugin
		new ServiceWorkerWebpackPlugin({
			entry: path.join(__dirname, './src/sw.js'),
		}),
	],
};
