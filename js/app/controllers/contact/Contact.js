/* global define */

define(['app'], function (app) {

	'use strict';

	app.register.controller('ContactController', ['$scope', 'contactService', function ($scope, contactService) {
		$scope.contacts = contactService.contacts;
	}]);
});