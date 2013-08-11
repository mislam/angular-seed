/* global define */

define(['app'], function (app) {

	'use strict';

	app.register.controller('FooBarController', ['$scope', function ($scope) {

		$scope.testVar = '5678';

		$scope.incrementTestVar = function () {
			$scope.testVar++;
		};

	}]);
});