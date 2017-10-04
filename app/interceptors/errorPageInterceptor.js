/**
 * Created by rtorres on 28/08/2017.
 */

angular.module('rallymetricsui')
    .factory('errorPageInterceptor', ['$q', '$location', function ($q, $location) {
        return{
            responseError: function (rejection) {
                if(rejection.status === -1){
                    $location.path("/error");
                }
                return $q.reject(rejection);
            }
        }
}]);