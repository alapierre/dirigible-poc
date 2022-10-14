/*
 * Generated by Eclipse Dirigible based on model and template.
 *
 * Do not modify the content as it may be re-generated again.
 */
angular.module('page', ["ideUI", "ideView", "entityApi"])
	.config(["messageHubProvider", function (messageHubProvider) {
		messageHubProvider.eventIdPrefix = 'poc.launchpad.Home';
	}])
	.config(["entityApiProvider", function (entityApiProvider) {
		entityApiProvider.baseUrl = "/services/v4/js/poc/gen/ui/launchpad/Home/tiles.js";
	}])
	.controller('PageController', ['$scope', 'messageHub', 'entityApi', function ($scope, messageHub, entityApi) {

		$scope.openView = function (location) {
			messageHub.postMessage("openView", {
				location: location
			});
		}

		entityApi.list().then(function (response) {
			if (response.status != 200) {
				messageHub.showAlertError("Home", `Unable to get Home Launchpad: '${response.message}'`);
				return;
			}
			$scope.data = response.data;
			$scope.groups = Object.keys(response.data);
		});

	}]);
