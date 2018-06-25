var HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'My Currency Converter',
            myPageHeader: 'Hello World',
            template: './src/index.html',
            filename: 'index.html' //relative to root of the application
        })
    ],
    devServer: {
        port: 3000,
        contentBase: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    }
};