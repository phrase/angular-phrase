module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)

  grunt.loadNpmTasks('grunt-contrib-coffee')

  grunt.initConfig
    pkg: grunt.file.readJSON('bower.json')
    build_dir: 'dist'
    coffee:
      compile:
        files:
          'build/phrase.js': 'src/phrase.coffee'
          'build/directives/phrase_javascript.js': 'src/directives/phrase_javascript.coffee'

    concat:
      core:
        src: ['build/phrase.js', 'build/directives/phrase_javascript.js']
        dest: '<%= build_dir %>/angular-phrase.js'

    karma:
      unit:
        configFile: "karma.unit.conf.js"
        singleRun: true

    uglify:
      core:
        files:
          '<%= build_dir %>/angular-phrase.min.js': '<%= concat.core.dest %>'

  grunt.registerTask('default', ['karma'])
  grunt.registerTask('build', [
    'coffee:compile',
    'concat:core',
    'uglify:core',
  ])

