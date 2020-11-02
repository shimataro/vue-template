import * as path from "path";

import * as dotenv from "dotenv";

import * as webpack from "webpack";
import {VueLoaderPlugin} from "vue-loader";

const env = dotenv.config({
	path: path.resolve(".env"),
});

const config: webpack.Configuration = {
	mode: "development",
	entry: "./src/index.ts",
	output: {
		filename: "index.js",
		path: path.resolve("dist"),
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "vue-loader",
					},
				],
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader",
						options: {
							appendTsSuffixTo: [/\.vue$/],
						},
					},
				],
			},
			{
				test: /\.pug$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "pug-plain-loader",
					},
				],
			},
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								indentedSyntax: true,
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [
			".ts",
			".js",
			".vue",
		],
		alias: {
			"@": path.resolve(__dirname, "src"),
			vue$: "vue/dist/vue.runtime.esm.js",
		},
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(env.parsed),
		}),
	],
};

export default config;
