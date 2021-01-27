const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const dev = {
    mode: "development",
    target: "web",
    entry: "./src/main.js",
    watch: false,
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000,
        ignored: /node_modules/
    },
    // devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true
    },

    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.[hash].js"
    },

    resolve: {
        alias: {
            vue: path.resolve(__dirname, "./node_modules/vue/dist/vue.js")
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     include: path.resolve(__dirname, "./src"),
            //     use: {
            //         loader: "babel-loader"
            //     }
            // },

            {
                test: /\.vue$/,
                include: [
                    path.resolve(__dirname, "./src"),
                    path.resolve("node_modules/vue-echarts"),
                    path.resolve("node_modules/echarts"),
                ],
                use: {
                    loader: "vue-loader"
                }
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "./src"),
                    path.resolve("node_modules/vue-echarts"),
                    path.resolve("node_modules/echarts"),
                ],
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [
                    // {
                    //     loader: "url-loader",
                    //     options: {

                    //     }
                    // },
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },


    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}



module.exports = dev;