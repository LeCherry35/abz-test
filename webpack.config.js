/* eslint-disable no-undef */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production';


module.exports = {
	entry: { myAppName: path.resolve(__dirname, './src/index.js') },
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: production ? '[name].[contenthash].js' : '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.svg$/,
				use: [
					'file-loader',
					'svgo-loader'
				]
			},
			// {
			//     test: /\.svg$/,
			//     loader: 'svg-inline-loader'
			// },
			// {
			//     test: /\.(png|jpe?g|gif)$/i,
			//     use: [
			//       {
			//         loader: 'file-loader',
			//       },
			//     ],
			//   },

		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.scss'],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: 'Webpack & React',
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: production ? '[name].[contenthash].css' : '[name].css',
		}),
	],
	devServer: {
		port: 3001,
		hot: true,
	},
	mode: production ? 'production' : 'development'
};
