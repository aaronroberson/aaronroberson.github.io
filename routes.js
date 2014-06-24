(function(angular) {
    "use strict";

    angular.module('aaronroberson')

        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/home.tpl.html'
                })
                .state('geekwise', {
                    url: '/geekwise',
                    templateUrl: 'views/geekwise/geekwise.tpl.html'
                })
                .state('geekwise.page', {
                    url: '/:page_id',
                    templateUrl: function(stateParams) {
                        return 'views/geekwise/day' + stateParams.page_id + '.tpl.html';
                    }
                })
	            .state('geek', {
		            url: '/geek',
		            templateUrl: 'views/geeks/geek.html'
	            })
	            .state('geek.page', {
		            url: '/:page_id',
		            templateUrl: function(stateParams) {
			            return 'views/geeks/day' + stateParams.page_id + '.html';
		            }
	            });

        });

})(window.angular);
