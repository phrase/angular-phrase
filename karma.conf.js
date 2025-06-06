const webpackConfig = require('./webpack.config.js');
module.exports = function(config) {
    const configuration = {
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
        webpackMiddleware: {
            stats: 'errors-only'
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        captureTimeout: 60000,
        autoWatch: true,
        browsers: [process.env.TRAVIS ? 'Firefox' : 'ChromeHeadless'],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless'],
            }
        },
        singleRun: false,
        concurrency: Infinity,
    };

    // Handle --configuration=ci parameter
    if (process.argv.includes('--configuration=ci')) {
        configuration.browsers = ['FirefoxHeadless'];
        configuration.singleRun = true;
    }

    config.set(configuration);
};
