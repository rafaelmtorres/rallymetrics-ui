/**
 * Created by rtorres on 27/07/2017.
 */

angular.module('rallymetricsui').service("releasesService", function ($http, endPointConfig, restConfig) {

    const baseURL = `${endPointConfig.host}:${endPointConfig.basePort}${endPointConfig.baseURI}`;

    this.getMilestones = function (numMilestones) {
        return $http.get(`${baseURL}/${restConfig.milestones}?numberOfMilestones=${numMilestones}`);
    };

    this.getMilestoneUserStories = function (milestoneName) {
        return $http.get(`${baseURL}/${restConfig.userStories}?milestone=${milestoneName}`);
    };

    this.getMilestoneDefects = function (milestoneName) {
        return $http.get(`${baseURL}/${restConfig.defects}?milestone=${milestoneName}`);
    };
});