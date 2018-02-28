const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cwd = process.cwd();

const webpackConfig = {
    entry: './app.js',
    output: {
        path: `${cwd}/output`,
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                [
                                    'env',
                                    {
                                        targets: {
                                            browsers: [
                                                'last 1 Chrome version',
                                                'last 1 ChromeAndroid version',
                                                'last 1 iOS version',
                                                'last 1 Edge version',
                                                'last 1 Firefox version'
                                            ]
                                        },
                                        modules: false
                                    }
                                ],
                                'stage-2',
                                'react'
                            ],
                            compact: false,
                            plugins: [
                                'transform-decorators-legacy'
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            title: 'App',
            template: './app.tmpl.html'
        })
    ],
    devtool: 'source-map'
}

if (process.env.NODE_ENV === 'production') {
    webpackConfig.plugins.push(
        new UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
            uglifyOptions: {
                ecma: 8,
                compress: {
                    dead_code: true,
                    global_defs: {
                        'process.env.NODE_ENV': 'production'
                    }
                }
            }
        })
    );
}

module.exports = webpackConfig;