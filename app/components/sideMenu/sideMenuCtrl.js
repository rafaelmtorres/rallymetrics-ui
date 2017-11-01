/**
 * Created by rtorres on 31/07/2017.
 */

angular.module('rallymetricsui').controller('sideMenuCtrl', function ($scope) {

    $scope.menuItems = [{route: '#!releases', description: 'Release'}, {route: '#!report', description: 'Report'}];

    $scope.changeItemClass = function ($index) {
        $scope.selectedIndex = $index;
    }
});