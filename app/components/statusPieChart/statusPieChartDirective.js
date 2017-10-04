/**
 * Created by rtorres on 03/08/2017.
 */

angular.module('rallymetricsui').directive('statusPieChartDirective', statusPieChart);

function statusPieChart() {
    let directive = {
        restrict: 'E',
        templateUrl: 'components/statusPieChart/statusPieChartView.html',
        scope: {
            ngModel : '='
        },
        controller: StatusPieChartController
    };
    return directive;
}

StatusPieChartController.$inject = ['$scope', 'chartColorConfig'];

function StatusPieChartController($scope, chartColorConfig) {

    let Graph = this;
    Graph.title = 'Milestone Status';
    Graph.type = 'doughnut';
    Graph.status = {
        inProgress : "In Progress",
        inTest : "In Test",
        notStarted : "Not Started",
        accepted : "Accepted"
    };
    Graph.chartCreated = false;
    Graph.chartData = null;

    function drawPie(canvasid, data) {
        let canvas = document.getElementById(canvasid);
        let ctx1 = canvas.getContext("2d");
        if(Graph.chartCreated){
            Graph.chartData.destroy();
            Graph.chartData = new Chart(ctx1, data);
        }else{
            Graph.chartData = new Chart(ctx1, data);
            Graph.chartCreated = true;
        }
    }

    function buildMilestoneStatusGraph(status) {
        return {
            type: Graph.type,
                data: {
                    datasets: [{
                        data: [
                            status.inProgress,
                            status.inTest,
                            status.notStarted,
                            status.accepted
                        ],
                        backgroundColor: [
                            chartColorConfig.green,
                            chartColorConfig.yellow,
                            chartColorConfig.red,
                            chartColorConfig.blue,
                        ],
                        label: Graph.title
                    }],
                        labels: [
                        Graph.status.inProgress,
                        Graph.status.inTest,
                        Graph.status.notStarted,
                        Graph.status.accepted
                    ]
                },
                options :{
                    responsive: true,
                        legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: Graph.title
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }
            };
    }

    $scope.$watch('ngModel', function (newValue, oldValue) {
        if(newValue !== null && newValue !== undefined){
            let graphData = buildMilestoneStatusGraph(newValue);
            drawPie('milestone-status-chart',graphData);
        }
    });


}