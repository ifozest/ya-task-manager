module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      src: ['./src/js/**/*.js']
    },
    clean: {
      src: ['./public']
    },
    copy: {
      src: {
        expand: true,
        cwd: './src/',
        src: ['**/*.html'],
        dest: './public'

      }
    },
    watch: {
      html: {
        files: ['./src/**/*.html'],
        tasks: ['copy']
      }
    }
  });

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};