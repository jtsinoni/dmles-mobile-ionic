var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

function getPlugins() {
    var env = process.env.IONIC_ENV;
    var plugins = [
        ionicWebpackFactory.getIonicEnvironmentPlugin(),
        new webpack.DefinePlugin({
            'IONIC_ENV_MB': JSON.stringify(env)
        })
    ];

    if (env === 'prod') {
        // This helps ensure the builds are consistent if source hasn't changed:
        plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    }
    return plugins;
}

module.exports = {
    entry: process.env.IONIC_APP_ENTRY_POINT,
    output: {
        path: '{{BUILD}}',
        filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
        devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
    },
    devtool: process.env.IONIC_GENERATE_SOURCE_MAP ? process.env.IONIC_SOURCE_MAP_TYPE : '',

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [path.resolve('node_modules')]
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                //test: /\.(ts|ngfactory.js)$/,
                test: /\.ts$/,
                loader: process.env.IONIC_WEBPACK_LOADER
            }
        ]
    },
    plugins: getPlugins(),

    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};