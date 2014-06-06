angular.module('aaronroberson').directive('prettyprint', function() {
	return {
		restrict: 'C',
		link: function postLink(scope, element, attrs) {
			console.log(element.html());
			element.html(prettyPrintOne(element.html()));
		}
	};
});
