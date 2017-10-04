/**
 * Created by rtorres on 31/07/2017.
 */

app.directive("sideMenuDirective", function () {
    return {
        restrict : 'EA',
        templateUrl: 'components/sideMenu/sideMenuView.html',
        controller: 'sideMenuCtrl'
    }
})