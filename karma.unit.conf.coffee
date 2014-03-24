module.exports = (config) ->
  config.set
    basePath: ''
    frameworks: ['jasmine']

    preprocessors:
      '**/*.coffee': ['coffee']

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/phrase.coffee',
      'src/**/*.coffee',
      'test/unit/**/*_spec.coffee'
    ]

    exclude: []

    reports: ['progress']

    port: 9876

    colors: true

    # LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    # Start these browsers, currently available:
    # - Chrome
    # - ChromeCanary
    # - Firefox
    # - Opera
    # - Safari (only Mac)
    # - PhantomJS
    # - IE (only Windows)
    browsers: ['Chrome']

    captureTimeout: 60000

    autoWatch: true

    # Continuous Integration mode
    # if true, it capture browsers, run tests and exit
    singleRun: false
