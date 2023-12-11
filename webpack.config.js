import { HotModuleReplacementPlugin } from 'webpack';
import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

/*global process,__dirname */

const production = process.env.NODE_ENV === 'production';

export const entry = { myAppName: _resolve(__dirname, './src/index.js') };
export const output = {
	path: _resolve(__dirname, './dist'),
	filename: production ? '[name].[contenthash].js' : '[name].js',
};
export const module = {
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
				'svgo-loader',
			],
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
};
export const resolve = {
	extensions: ['*', '.js', '.jsx', '.scss'],
};
export const plugins = [
	new CleanWebpackPlugin(),
	new HotModuleReplacementPlugin(),
	new HtmlWebpackPlugin({
		title: 'Webpack & React',
		template: './src/index.html',
	}),
	new MiniCssExtractPlugin({
		filename: production ? '[name].[contenthash].css' : '[name].css',
	}),
];
export const devServer = {
	port: 3001,
	hot: true,
};
export const mode = production ? 'production' : 'development';
