/**
 * Created by rtorres on 27/07/2017.
 */

angular.module('rallymetricsui').controller("ReleaseController", ReleaseController);

ReleaseController.$inject = ['$scope','releasesService'];

function ReleaseController($scope, releasesService) {

    let Release = this;

    Release.pageTitle = "R9 releases dashboard";
    Release.userStoriesTitle = "User Stories"
    Release.defectsTitle = "Defects";

    Release.order = "status";

    Release.orderBy = function(orderField){
        Release.order = orderField;
        Release.directionOrder = !Release.directionOrder;
    };

    $scope.$watch('Release.milestoneSelected', function (milestoneSelected) {

        Release.uiDefects = [];
        Release.uiUserStories = [];

        if(milestoneSelected){

            let userStories = releasesService.getMilestoneUserStories(milestoneSelected.name);
            let defects = releasesService.getMilestoneDefects(milestoneSelected.name);
            console.log(userStories);
            console.log(defects);
            Promise.all([userStories, defects]).then(obj => {
                console.log(obj);
                let usItems = obj[0];
                let defectItems = obj[1];

                usItems.data.forEach(us => {
                    let owner = '';
                    if(us.Owner){
                        owner = us.Owner._refObjectName;
                    }
                    let codeReviewTag = "";
                    us.Tags._tagsNameArray.forEach((element) => {
                        if(element.Name === "Code Review"){
                            codeReviewTag = element.Name
                        }
                    });

                    Release.uiUserStories.push({id: us.FormattedID,
                        owner: owner,
                        status: us.c_KanbanStatePortalLegacy,
                        description: us._refObjectName,
                        tag: codeReviewTag
                    });
                });


                defectItems.data.forEach(defect => {
                    let owner = '';
                    if(defect.Owner){
                        owner = defect.Owner._refObjectName;
                    }

                    let codeReviewTag = "";
                    defect.Tags._tagsNameArray.forEach((element) => {
                        console.log(element)
                        if(element.Name === "Code Review"){
                            codeReviewTag = element.Name
                        }
                    });

                    Release.uiDefects.push({id: defect.FormattedID,
                        owner: owner,
                        status: defect.c_KanbanStatePortalLegacy,
                        description: defect._refObjectName,
                        tag: codeReviewTag
                    });
                });

                $scope.$apply();
            });
        }
    });
}