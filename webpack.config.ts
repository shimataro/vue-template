import * as path from "path";

import * as dotenv from "dotenv";

import * as webpack from "webpack";
import {VueLoaderPlugin} from "vue-loader";

interface Environment
{
}
interface Parameters
{
	mode?: "development" | "production" | "none";
	env: Environment;
}

/**
 * .envファイルをロード
 * @param mode ビルドモード
 * @returns ロード結果
 */
function loadEnv(mode?: string): dotenv.DotenvParseOutput
{
	const options: dotenv.DotenvConfigOptions = {};
	if(mode !== undefined)
	{
		options.path = path.resolve(`.env.${mode}`);
	}

	const config = dotenv.config(options);
	if(config.parsed === undefined)
	{
		return {};
	}
	return config.parsed;
}

export default (env: Environment, parameters: Parameters): webpack.Configuration =>
{
	const config = {...loadEnv(), ...loadEnv(parameters.mode)};

	return {
		mode: parameters.mode,
		entry: path.resolve("src", "index.ts"),
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
				"@": path.resolve("src"),
				vue$: "vue/dist/vue.runtime.esm.js",
			},
		},
		plugins: [
			new VueLoaderPlugin() as webpack.WebpackPluginInstance, // TODO: vue-loader16以降で、asを取り除いてみる
			new webpack.DefinePlugin({
				"process.env": JSON.stringify(config),
			}),
		],
	};
};
