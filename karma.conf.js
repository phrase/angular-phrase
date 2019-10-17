const webpackConfig = require('./webpack.config.js');
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-translate/dist/angular-translate.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/angular-phrase.ts',
            'test/**/*.ts'
        ],
        exclude: [],
        preprocessors: {
            'test/**/*.ts': ['webpack'],
            'src/**/*.ts': ['webpack']
        },
        webpack: {
            module: webpackConfig().module,
            resolve: webpackConfig().resolve,
            mode: "development"
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        captureTimeout: 60000,
        autoWatch: true,
        browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
        singleRun: false,
        concurrency: Infinity,
    });
};
