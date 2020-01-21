const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {test: /\.vue$/, loader: 'vue-loader'},
            {test: /\.css$/, loader: ['style-loader', 'css-loader']},
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test:/\.(ttf|jpg|png|gif|svg)$/, loader: 'url-loader'}
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname),
        open: true,
        hot: true
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
}