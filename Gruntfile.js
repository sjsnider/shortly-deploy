module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/client/*.js'],
        dest: 'public/dist/built.js',
      }
    },

    mochaTest: {
      test: {
        src: ['test/**/*.js'],
      },
      options: {
        force: true,
        reporter: 'spec'
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      /*options: {
        mangle: {
          except: ['jQuery', 'Backbone']
        }
      },*/
      build: {
        files: [{
          expand: true,
          cwd: 'public/lib/',
          src: '*.js',
          dest: 'public/dist/',
          ext: '.min.js'
        },
        {'public/dist/built.min.js': 'public/dist/built.js'}]
      }
    },

    jshint: {
      files: [
        // Add filespec list here
        'public/**/*.js',
        'app/**/*.js',
        'lib/*.js',
        'test/*.js',
        '*.js'
      ],
      options: {
        force: false,
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'public/',
        src: ['*.css', '!*.min.css'],
        dest: 'public/dist/',
        ext: '.min.css'
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      setenv: {
        command: 'azure site config add MONCONNECT="mongodb://sjsnider:minlyhr13@ds030827.mongolab.com:30827/MongoLab-lo"'
      },
      prodServer: {
        command: 'git push azure mongoRefactor:master'
      }
    },
  });


  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', ['mochaTest', 'jshint']);

  grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
      grunt.task.run('shell');
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', ['test', 'build']);
};
