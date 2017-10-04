/**
 * Created by rtorres on 01/08/2017.
 */
//Routing configuration
angular.module('rallymetricsui').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider, releasesService) {

    $locationProvider.hashPrefix('!');

    $routeProvider.when('/releases' , {
        templateUrl: 'releases/releaseView.html',
        controller: 'ReleaseController',
        controllerAs: 'Release'
    }).when('/report', {
        templateUrl: 'report/reportView.html',
        controller: 'ReportController',
        controllerAs: 'Report'
    }).when('/error', {
        templateUrl: 'common/error/errorView.html',
    }).otherwise({redirectTo: '/'});
}]);