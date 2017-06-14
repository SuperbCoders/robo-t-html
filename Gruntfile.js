module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      templates: {
        files: ['jade/*.jade', 'jade/*.pug'],
        tasks: ['pug'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['sass/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          style: 'expanded'
        },
        files: {
          'styles/main_global.css': 'sass/main_global.scss',
          'styles/project_blue.css': 'sass/project_blue.scss',
          'styles/project_green.css': 'sass/project_green.scss'
        }
      }
    },
    pug: {
      // debug: {
      //   options: {
      //     data: {
      //       client: false,
      //       debug: true,
      //       pretty: true
      //     }
      //   },
      //   files: [{
      //     cwd: "jade/",
      //     src: "*.jade",
      //     dest: "",
      //     expand: true,
      //     ext: ".html"
      //   }]
      // },
      release: {
        options: {
          pretty: true
        },
        files: [{
          cwd: "jade/",
          src: "*.jade",
          dest: "",
          expand: true,
          ext: ".html"
        }]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['watch']);
};
