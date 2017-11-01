/**
 * Created by rtorres on 31/07/2017.
 */

angular.module('rallymetricsui').directive("sideMenuDirective", function () {
    return {
        restrict : 'EA',
        templateUrl: '../app/components/sideMenu/sideMenuView.html',
        controller: 'sideMenuCtrl'
    }
})