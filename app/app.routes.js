/**
 * Created by rtorres on 01/08/2017.
 */
//Routing configuration
//angular.module('rallymetricsui').config(RoutingConfig);

RoutingConfig.$inject = ['$locationProvider', '$routeProvider'];

export default function RoutingConfig($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider.when('/releases' , {
        templateUrl: '../app/releases/releaseView.html',
        controller: 'ReleaseController',
        controllerAs: 'Release'
    }).when('/report', {
        templateUrl: '../app/report/reportView.html',
        controller: 'ReportController',
        controllerAs: 'Report'
    }).when('/error', {
        templateUrl: '../app/common/error/errorView.html',
    }).otherwise({redirectTo: '/'});
}