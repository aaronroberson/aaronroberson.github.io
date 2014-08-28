angular.module('aaronroberson').directive('prettyprint', function() {
	return {
		restrict: 'C',
		link: function postLink(scope, element, attrs) {
			element.html(prettyPrintOne(element.html()));
		}
	};
});
