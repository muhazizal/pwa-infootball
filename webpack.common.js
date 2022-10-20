// Init
const isDevelopment = process.env.NODE_ENV === 'development'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

// Exports
module.exports = {
	entry: {
		main: './src/app.js',
		vendors: ['webpack-material-design-icons'],
	},
	output: {
		filename: isDevelopment ? '[name].js' : 'js/[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			// HTML loader
			{
				test: /\.html$/,
				loader: 'html-loader',
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
							// Prefer `dart-sass`
							implementation: require('sass'),
							sassOptions: {
								fiber: require('fibers'),
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
					name: isDevelopment
						? '[path][name].[ext]'
						: '[name].[contenthash].[ext]',
					outputPath: path.join('assets', 'images'),
					limit: 10000,
				},
			},
			// File loader for fonts
			// Output has the same path level as CSS file
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
			filename: 'index.html',
			template: './src/index.html',
			favicon: './src/assets/icons/favicon.png',
			minify: true,
			hash: true,
		}),
		new HtmlWebpackPlugin({
			filename: 'competition.html',
			template: './src/competition.html',
			favicon: './src/assets/icons/favicon.png',
			minify: true,
			hash: true,
		}),
		new HtmlWebpackPlugin({
			filename: 'html/navbar.html',
			template: './src/html/navbar.html',
			minify: true,
			hash: true,
			inject: false,
		}),
		new HtmlWebpackPlugin({
			filename: 'html/tabs.html',
			template: './src/html/tabs.html',
			minify: true,
			hash: true,
			inject: false,
		}),
		new HtmlWebpackPlugin({
			filename: 'html/pages/home.html',
			template: './src/html/pages/home.html',
			minify: true,
			hash: true,
			inject: false,
		}),
		new HtmlWebpackPlugin({
			filename: 'html/pages/favorite.html',
			template: './src/html/pages/favorite.html',
			minify: true,
			hash: true,
			inject: false,
		}),
		new HtmlWebpackPlugin({
			filename: 'html/pages/standing.html',
			template: './src/html/pages/standing.html',
			minify: true,
			hash: true,
			inject: false,
		}),
		new HtmlWebpackPlugin({
			filename: 'html/pages/matches.html',
			template: './src/html/pages/matches.html',
			minify: true,
			hash: true,
			inject: false,
		}),
		new HtmlWebpackPlugin({
			filename: 'html/pages/teams.html',
			template: './src/html/pages/teams.html',
			minify: true,
			hash: true,
			inject: false,
		}),
		new HtmlWebpackPlugin({
			filename: 'html/pages/offline.html',
			template: './src/html/pages/offline.html',
			minify: true,
			hash: true,
			inject: false,
		}),
		// Pwa manifest plugin
		new WebpackPwaManifest({
			name: 'PWA Infootball',
			gcm_sender_id: '940729100277',
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
			start_url: '/',
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
		new WorkboxWebpackPlugin.InjectManifest({
			swSrc: './src/sw.js',
			swDest: 'sw.js',
		}),
	],
	devServer: {
		// Serve file from dist folder
		contentBase: path.join(__dirname, 'dist'),
		writeToDisk: true,
	},
	devtool: 'inline-source-map',
}
