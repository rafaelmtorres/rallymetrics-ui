/**
 * Created by rtorres on 25/10/2017.
 */
const path = require('path')
const webpack = require('webpack');

module.exports = {
    //Application entrypoint
    entry:{
      app : "./app/app.module.js",
      vendor: ['jquery', 'angular', 'angular-route', 'chart.js']
    },

    //Results of operations done by webpack
    output : {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    //Loaders used to deal with css, imgs, etc
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //Webpack execute loaders in reverse order: css should be the last one then.
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({}),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery',
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};