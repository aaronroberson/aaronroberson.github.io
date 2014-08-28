(function(angular) {

    angular.module('aaronroberson', ['ui.router', 'gist', 'ngDisqus'])

	    .config(function($disqusProvider) {

		    $disqusProvider.setShortname = 'aaronrobersongithub';

	    });

})(window.angular);
