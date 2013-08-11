/* global define, angular */

define(['config', 'route'], function (config) {

	'use strict';

	var app = angular.module(config.appName, ['router']);

	app.config(['$routeProvider', 'routerProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
		function ($routeProvider, routerProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

			var router, path,
				routes = config.routes;

			//Change default views and controllers directory using the following:
			//routerProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');

			app.register =
			{
				controller: $controllerProvider.register,
				directive: $compileProvider.directive,
				filter: $filterProvider.register,
				factory: $provide.factory,
				service: $provide.service
			};

			// controllers will be loaded dynamically
			router = routerProvider.router;

			for (path in routes) {
				if (routes.hasOwnProperty(path)) {
					$routeProvider.when(path, router.resolve(routes[path]));
				}
			}

			$routeProvider.otherwise({ redirectTo: '/' });
	}]);

	return app;
});




