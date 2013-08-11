/* global define, require, angular */

define([], function () {

	'use strict';

	var router = angular.module('router', []);

	//Must be a provider since it will be injected into module.config()	
	router.provider('router', function () {

		this.$get = function () {
			return this;
		};

		this.routeConfig = function () {
			var viewsDirectory = '/js/app/views/',
				controllersDirectory = '/js/app/controllers/',

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

});
