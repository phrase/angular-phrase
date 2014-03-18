module.exports = (grunt) ->

  grunt.loadNpmTasks('grunt-contrib-coffee')

  grunt.initConfig
    coffee:
      compile:
        files:
          'build/phrase.js': 'src/phrase.coffee'
          'build/directives/phrase_javascript.js': 'src/directives/phrase_javascript.coffee'

