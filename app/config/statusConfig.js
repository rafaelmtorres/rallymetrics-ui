/**
 * Created by rtorres on 16/08/2017.
 */

angular.module('rallymetricsui').value("statusConfig", {
    backlog : 'Backlog',
    prioritized : 'Prioritized',
    analysis : 'Analysis',
    codeReview : 'Code Review',
    code : 'Code',
    waitingForDeploy : 'Waiting for deploy',
    readyToTest : 'Ready to Test',
    testCaseReview : 'Test Case Review',
    inTest : 'In Test',
    readyForDemo : 'Ready for Demo',
    accepted : 'Accepted'
});