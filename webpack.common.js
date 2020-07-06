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
	entry: {
		main: './src/app.js',
		vendors: ['webpack-material-design-icons'],
	},
	output: {
		filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
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
			// File loader for images
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: isDevelopment ? '[path][name].[ext]' : '[name].[contenthash].[ext]',
					outputPath: path.join('assets', 'images'),
					limit: 10000,
				},
			},
			// File loader for fonts
			{
				test: /\.(eot|woff|ttf|woff2|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: isDevelopment ? '[path][name].[ext]' : '[name].[ext]',
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
			filename: isDevelopment ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
		}),
		// HTML plugin
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			favicon: './src/assets/icons/favicon.png',
			hash: true,
		}),
		new HtmlWebpackPlugin({
			template: './src/competition.html',
			filename: 'competition.html',
			favicon: './src/assets/icons/favicon.png',
			hash: true,
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
