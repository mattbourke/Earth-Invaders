module.exports  = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist:{
             src: ['js/modules/**/*.js','js/boardObjects/**/*.js','js/controller.js','js/levelsJSON.js','js/util.js'],
             dest: 'js/minified.min.js'
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};