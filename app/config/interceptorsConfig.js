/**
 * Created by rtorres on 28/08/2017.
 */

angular.module('rallymetricsui')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('errorPageInterceptor');
}])