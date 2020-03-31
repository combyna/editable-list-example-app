/**
 * Combyna editable list example app
 * Copyright (c) the Combyna project and contributors
 * https://github.com/combyna/editable-list-example-app
 *
 * Released under the MIT license
 * https://github.com/combyna/editable-list-example-app/raw/master/MIT-LICENSE.txt
 */

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 10 });

module.exports = {
    context: __dirname,
    entry: './js/index',
    resolve: {
        // Ignore NPM dependencies installed outside of node_modules (eg. other node_modules folders in /vendor)
        modules: [__dirname + '/node_modules']
    },
    module: {
        rules: [
            {
                test: /\.php$/,
                use: 'happypack/loader?id=phpify'
            },
            {
                test: /\.php$/,
                use: 'happypack/loader?id=source-map-extraction',
                enforce: 'post'
            },
            {
                test: /\.js$/,
                exclude: /\bnode_modules\/(?!combyna)/,
                use: {
                    loader: 'happypack/loader?id=babel'
                }
            }
        ]
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'client.js'
    },
    plugins: [
        new HappyPack({
            id: 'phpify',
            threadPool: happyThreadPool,
            loaders: [
                'transform-loader?phpify'
            ]
        }),
        new HappyPack({
            id: 'source-map-extraction',
            threadPool: happyThreadPool,
            loaders: [
                'source-map-loader'
            ]
        }),
        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: [
                'babel-loader'
            ]
        })
    ]
};
