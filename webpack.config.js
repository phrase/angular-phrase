const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = (env, argv = {mode: 'development'}) => ({
    entry: "./src/angular-phrase.ts",
    optimization: {
        minimizer: [
            new TerserJSPlugin({})
        ]
    },
    output: {
        filename: argv.mode === 'production' ? "angular-phrase.min.js" : "angular-phrase.js",
        path: __dirname + "/dist"
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
});
