/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name.toLowerCase() %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      css:{
        files: 'dist/**/*.css',
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      },
      dev: {
        files: 'coffee/**/*.coffee',
        tasks: ['coffee:compile', 'browserify']
      }

    },

    'http-server': {
      dev: {
        root: './dist/',
        port: 8080,
        host: "127.0.0.1",
        showDir : true,
        autoIndex: true,
        defaultExt: "html",
        runInBackground: false
      }
    },

    coffee: {
      options:{
        bare: true,
        preserve_dirs: true
      },
      compile: {
        expand: true,
        flatten: false,
        cwd: 'coffee',
        src: '**/*.coffee',
        dest: 'src/',
        ext: '.js'
      }
    },

    browserify: {
      dist: {
        files: {
          '<%= concat.dist.dest %>': 'src/main.js'
        },
        options: {
          bundleOptions:{
            "standalone": "VideoPlayerManager"
          }
        }
      }
    },

    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          require: ['./tests/setup.js']
        },
        src: ['tests/test_*.js']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-debug-task');

   // Default task.
  grunt.registerTask('build', [
    'coffee:compile',
    'browserify'
  ]);

  grunt.registerTask('test', [
    'build',
    'mochaTest'
  ]);

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
