var webpack = require('webpack')
var PROD = (process.env.NODE_ENV === 'production')
var provideAngular = new webpack.ProvidePlugin({ angular: "angular" })
module.exports = {
    entry: "./src/angular-phrase.ts",
    output: {
      filename: PROD ? "angular-phrase.min.js" : "angular-phrase.js",
      path: __dirname + "/dist"
    },

    devtool: 'source-map',

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/ },
        ]
          /*,
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, use: ["source-map-loader"], enforce: 'pre' }
        ]*/
    },
    plugins: PROD ? [ 
      provideAngular,
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        mangle: { except: ['angular', 'exports', 'module'] },
      })
    ] : [provideAngular],

    externals: {
      'angular': 'angular'
    }
};
