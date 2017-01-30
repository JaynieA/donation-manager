module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      //there can be multiple files and multiple tasks here
      files: ['client/*.js', 'client/**/*.js'],
      tasks: ['uglify']
    },

    uglify: {
      my_target: {
        options: {
          mangle: false
        },
        files: {
          'public/scripts/client.min.js': ['client/*.js', 'client/**/*.js']
        }
      }
    }

  }); // end initConfig

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [ 'watch' ] );

}; // end exports
