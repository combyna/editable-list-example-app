/**
 * Combyna editable list example app
 * Copyright (c) the Combyna project and contributors
 * https://github.com/combyna/editable-list-example-app
 *
 * Released under the MIT license
 * https://github.com/combyna/editable-list-example-app/raw/master/MIT-LICENSE.txt
 */

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
                use: 'uniter-loader'
            },
            {
                test: /\.js$/,
                exclude: /\bnode_modules\/(?!combyna)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'client.js'
    }
};
