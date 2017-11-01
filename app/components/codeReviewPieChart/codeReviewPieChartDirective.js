/**
 * Created by rtorres on 29/08/2017.
 */

angular.module('rallymetricsui').directive('codeReviewPieChartDirective', codeReviewPieChart);

function codeReviewPieChart() {
    let directive = {
        restrict: 'E',
        templateUrl: '../app/components/codeReviewPieChart/codeReviewPieChartView.html',
        scope: {
            ngModel : '='
        },
        controller: CodeReviewPieController
    };
    return directive;
}

CodeReviewPieController.$inject = ['$scope', 'chartColorConfig'];

function CodeReviewPieController($scope, chartColorConfig){

    let CodeReview = this;

    CodeReview.title = "Code Review status";
    CodeReview.type = 'doughnut';
    CodeReview.status = {
        reviewed : 'Reviewed',
        inProgress: 'In Progress',
        notStarted: 'Not Started',
        notReviewed: 'Not Reviewed'
    }

    CodeReview.chartData = null;
    CodeReview.chartCreated = false;

    function drawPie(canvasid, data) {
        let canvas = document.getElementById(canvasid);
        let ctx1 = canvas.getContext("2d");
        if(CodeReview.chartCreated){
            CodeReview.chartData.destroy();
            CodeReview.chartData = new Chart(ctx1, data);
        }else{
            CodeReview.chartData = new Chart(ctx1, data);
            CodeReview.chartCreated = true;
        }
    }


    function buildMilestoneStatusGraph(status) {
        return {
            type: CodeReview.type,
            data: {
                datasets: [{
                    data: [
                        status.reviewed,
                        status.inProgress,
                        status.notStarted,
                        status.noReview
                    ],
                    backgroundColor: [
                        chartColorConfig.green,
                        chartColorConfig.grey,
                        chartColorConfig.yellow,
                        chartColorConfig.red,
                    ],
                    label: CodeReview.title
                }],
                labels: [
                    CodeReview.status.reviewed,
                    CodeReview.status.inProgress,
                    CodeReview.status.notStarted,
                    CodeReview.status.notReviewed
                ]
            },
            options :{
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: CodeReview.title
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
    }


    $scope.$watch('ngModel', function (newValue, oldValue) {

        console.log(newValue);
        if(newValue !== null && newValue !== undefined){
            let graphData = buildMilestoneStatusGraph(newValue);
            drawPie('codereview-status-chart',graphData);
        }
    });
}