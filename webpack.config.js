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
            title: 'Currency Converter ALC',
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
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.png$/,
                use: [
                  {
                     loader: 'url-loader',
                     query: { limit : 15000 }
                  }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                  {
                     loader: 'url-loader',
                     query: { limit : 15000 }
                  }
                ]
            }
        ]
    }
};