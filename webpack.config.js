const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin-next');

module.exports = {
    mode: "development",

    entry: "./src/index.tsx",
    output:{
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js"
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve("public/index.html"),
            inlineSource: '.(js|jsx|ts|tsx|scss|css)$',
            inject: true
        }),
        new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', ".scss", ".css", ".svg", ".ico"],
    },
    module:{
        rules:[
            {
                test: /\.(ts|tsx?)$/,
                exclude: /(node_modules)/,
                use: "ts-loader"
            },
            {
                test: /\.scss$/,
                use: ["style-loader",
                    "css-loader",
                    "sass-loader"]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader'
                    },
                ],
            },
        ]
    }
}