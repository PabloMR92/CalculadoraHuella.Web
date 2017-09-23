const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');

module.exports = {
    module: {
        loaders: [{
                test: /\.json$/,
                loaders: [
                    'json-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce: 'pre'
            },
            {
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?minimize!postcss-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'ng-annotate-loader',
                    'babel-loader'
                ]
            },
            {
                test: /\.html$/,
                loaders: [
                    'html-loader'
                ]
            },
            { test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        FailPlugin,
        new HtmlWebpackPlugin({
            template: conf.path.src('index.html')
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: { comments: false },
            compress: { unused: true, dead_code: true, warnings: false } // eslint-disable-line camelcase
        }),
        new ExtractTextPlugin('index-[contenthash].css'),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: () => [autoprefixer]
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Tether: 'Tether',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
        })
    ],
    output: {
        path: path.join(process.cwd(), conf.paths.dist),
        filename: '[name]-[hash].js'
    },
    entry: {
        app: `./${conf.path.src('index')}`,
        vendor: Object.keys(pkg.dependencies)
    }
};