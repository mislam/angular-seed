/* global define */

define(['app'], function (app) {

	'use strict';

	app.register.controller('ContactController', ['$scope', function ($scope) {

		$scope.myVar = '1234';

		$scope.incrementMyVar = function () {
			$scope.myVar++;
		};

	}]);
});