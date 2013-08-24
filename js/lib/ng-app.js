/* global define, require, angular */

define(['config'], function (config) {

	'use strict';

	var app = angular.module(config.appName, []);

	app.provider('route', function () {

		this.$get = function () {
			return this;
		};

		this.routeConfig = function () {
			var viewsDirectory = config.appDir + '/views/',
				controllersDirectory = config.appDir + '/controllers/',

			setBaseDirectories = function (viewsDir, controllersDir) {
				viewsDirectory = viewsDir;
				controllersDirectory = controllersDir;
			},

			getViewsDirectory = function () {
				return viewsDirectory;
			},

			getControllersDirectory = function () {
				return controllersDirectory;
			};

			return {
				setBaseDirectories: setBaseDirectories,
				getControllersDirectory: getControllersDirectory,
				getViewsDirectory: getViewsDirectory
			};
		}();

		this.router = function (routeConfig) {

			var resolve = function (path) {

				var file, dir,
					pathParts = path.split('/', 2);

				if (pathParts.length === 1) {
					dir = '';
                    file = pathParts[0];
				} else if (pathParts.length === 2) {
                    dir = pathParts[0] + '/';
                    file = pathParts[1];
                }

				var routeDef = {};
				routeDef.templateUrl = routeConfig.getViewsDirectory() + dir + file + '.html';
				routeDef.controller = file + 'Controller';
				routeDef.resolve = {
					load: ['$q', '$rootScope', function ($q, $rootScope) {
						var dependencies = [routeConfig.getControllersDirectory() + dir + file + '.js'];
						return resolveDependencies($q, $rootScope, dependencies);
					}]
				};

				return routeDef;
			},

			resolveDependencies = function ($q, $rootScope, dependencies) {
				var defer = $q.defer();
				require(dependencies, function () {
					defer.resolve();
					$rootScope.$apply();
				});

				return defer.promise;
			};

			return {
				resolve: resolve
			};

		}(this.routeConfig);
	});

	app.config(['$routeProvider', 'routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
		function ($routeProvider, routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

			var router, path,
				routes = config.routes;

			app.register =
			{
				controller: $controllerProvider.register,
				directive: $compileProvider.directive,
				filter: $filterProvider.register,
				factory: $provide.factory,
				service: $provide.service
			};

			// controllers will be loaded dynamically
			router = routeProvider.router;

			for (path in routes) {
				if (routes.hasOwnProperty(path)) {
					$routeProvider.when(path, router.resolve(routes[path]));
				}
			}

			$routeProvider.otherwise({ redirectTo: config.defaultRedirect });
	}]);

	return app;
});




