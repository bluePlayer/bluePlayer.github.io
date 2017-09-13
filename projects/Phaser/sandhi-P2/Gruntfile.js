module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify : {
            build : {
                files : [{
                    "src" : [
                                'js/SI.js',
                                'js/utils/Constants.js',
                                'js/utils/GameMessages.js',
                                'js/utils/GameErrors.js',
                                'js/utils/Utility.js',
                                'js/utils/GraphicsUtility.js',
                                'js/State.js',
                                'js/Screens/Boot.js',
                                'js/UI/SIButton.js',
                                'js/UI/GoToScreen.js',
                                'js/UI/GoToUrl.js',
                                'js/Screens/Screen.js',
                                'js/Screens/Preloader.js',
                                'js/Screens/GameOverScreen.js',
                                'js/Screens/GameScreen.js',
                                'js/Screens/HelpScreen.js',
                                'js/LetterBox/*.js'
                            ],
                    "dest" : "js/SI.min.js"
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};