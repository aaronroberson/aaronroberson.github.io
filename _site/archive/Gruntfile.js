module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: '',
                    hostname: 'localhost',
                    keepalive: true,
                    open: {
                        target: 'http://localhost:3000',
                        appName: 'MyStore'
                    }
                }
            }
        }
    });

    // Load the grunt-contrib-connect plugin used to start a connect web server.
    // https://github.com/gruntjs/grunt-contrib-connect
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['connect']);

};