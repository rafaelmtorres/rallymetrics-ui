/**
 * Created by rtorres on 31/07/2017.
 */

angular.module('rallymetricsui').controller("ReportController", ReportController);

ReportController.$inject = ['$scope', 'releasesService', 'statusConfig'];

function ReportController($scope, releasesService, statusConfig) {

    let Report = this;
    Report.pageTitle = "R9 release report";
    Report.totalItemsForMilestone = 0;

    Report.statusReport = {};
    Report.codeReviewReport = {};

    Report.inProgress = 0;
    Report.inTest = 0;
    Report.notStarted = 0;
    Report.accepted = 0;

    Report.reviewCompleted = 0;
    Report.reviewInProgress = 0;
    Report.reviewNotStarted = 0;
    Report.notReviewed = 0;


    function buildMilestoneStatusResult(item) {
        if(item.c_KanbanStatePortalLegacy !== null){
            if(item.c_KanbanStatePortalLegacy.toUpperCase() === statusConfig.backlog.toUpperCase() ||
                item.c_KanbanStatePortalLegacy.toUpperCase() === statusConfig.prioritized.toUpperCase() ||
                item.c_KanbanStatePortalLegacy.toUpperCase() === statusConfig.analysis.toUpperCase()){
                Report.notStarted += 1;
            }else if(item.c_KanbanStatePortalLegacy.toUpperCase() === statusConfig.code.toUpperCase()
                || item.c_KanbanStatePortalLegacy.toUpperCase() === statusConfig.waitingForDeploy.toUpperCase()
                || item.c_KanbanStatePortalLegacy.toUpperCase() === statusConfig.readyToTest.toUpperCase()){
                Report.inProgress += 1;
            }else if(item.c_KanbanStatePortalLegacy.toUpperCase() === statusConfig.inTest.toUpperCase()){
                Report.inTest += 1;
            }else if(item.c_KanbanStatePortalLegacy.toUpperCase() === statusConfig.accepted.toUpperCase()){
                Report.accepted += 1;
            }
        }else{
            console.error(item);
        }

    }

    function buildCodeReviewStatusResult(element) {
        let hasCodeReviewTag = false;
        element.Tags._tagsNameArray.forEach((e) => {
            if(e.Name === "Code Review"){
                if(element.c_KanbanStatePortalLegacy.toUpperCase() === statusConfig.accepted.toUpperCase()){
                    Report.reviewCompleted += 1;
                }else if(element.c_KanbanStatePortalLegacy.toUpperCase() === statusConfig.codeReview.toUpperCase()){
                    Report.reviewInProgress += 1;
                }else{
                    Report.reviewNotStarted += 1;
                }
            }else{
                Report.notReviewed += 1;
            }
        });
    }

    function updateMilestoneChartValues(){
        Report.statusReport = {
            inProgress : Report.inProgress,
            inTest: Report.inTest,
            notStarted : Report.notStarted,
            accepted : Report.accepted
        }
    }

    function updateCodeReviewChartValues(){
        Report.codeReviewReport = {
            reviewed: Report.reviewCompleted,
            inProgress: Report.reviewInProgress,
            notStarted: Report.reviewNotStarted,
            noReview: Report.notReviewed
        }
    }

    function initProperties() {
        Report.statusReport = {
            inProgress : 0,
            inTest : 0,
            notStarted : 0,
            accepted : 0,
        };

        Report.uiDefects = [];
        Report.uiUserStories = [];

        Report.totalItemsForMilestone = 0;

        Report.inProgress = 0;
        Report.inTest = 0;
        Report.notStarted = 0;
        Report.accepted = 0;

    }

    function calculateTotalItemsForMilestone(totalUserStories, totalDefects){
        return totalUserStories + totalDefects;
    }

    $scope.$watch('Report.milestoneSelected', function (milestoneSelected) {

        initProperties();

        if(milestoneSelected){
            let userStories = releasesService.getMilestoneUserStories(milestoneSelected.name);
            let defects = releasesService.getMilestoneDefects(milestoneSelected.name);

            Promise.all([userStories, defects]).then(obj => {
                let usItems = obj[0];
                let defectItems = obj[1];

                Report.totalItemsForMilestone = calculateTotalItemsForMilestone(usItems.data.length, defectItems.data.length);

                usItems.data.forEach(us => {
                    let owner = '';
                    if(us.Owner) {
                        owner = us.Owner._refObjectName;
                    }
                    buildMilestoneStatusResult(us);
                    buildCodeReviewStatusResult(us);
                });

                defectItems.data.forEach(defect => {
                    let owner = '';
                    if(defect.Owner){
                        owner = defect.Owner._refObjectName;
                    }
                    buildMilestoneStatusResult(defect);
                    buildCodeReviewStatusResult(defect);
                });

                updateMilestoneChartValues();
                updateCodeReviewChartValues();

                $scope.$apply();

            });
        }
    });
}