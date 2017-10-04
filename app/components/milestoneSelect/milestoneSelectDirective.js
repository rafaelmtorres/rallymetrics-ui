/**
 * Created by rtorres on 31/07/2017.
 */

angular.module('rallymetricsui').directive('milestoneSelectDirective', milestoneSelect);

milestoneSelect.$inject = ['releasesService'];

function milestoneSelect(releasesService) {
    let directive = {
        restrict: 'E',
        templateUrl: 'components/milestoneSelect/milestoneSelect.html',
        scope: {
            ngModel: "="
        },
        controller: MilestoneSelectController
    }
    return directive;
}

MilestoneSelectController.$inject = ['$scope', 'releasesService'];

function MilestoneSelectController($scope, releasesService){
    const numberOfMilestones = 5;

    let loadMilestones = function(){
        releasesService.getMilestones(numberOfMilestones)
            .then( (result) => {
                let list = [];
                result.data.forEach(element => {
                    let id = element.Name.substr(7, element.Name.length - 1);
                    list.push({name: element.Name, id: id});
                });
                $scope.milestoneList = list;
            }, (error) => {
                console.error("Error getting the milestones: " + error);
            });
        }

    loadMilestones();
}