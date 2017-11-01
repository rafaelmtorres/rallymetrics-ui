'use strict';

import '../public/css/app.css';
import '../public/css/dashboard.css';

import "../node_modules/html5-boilerplate/dist/js/vendor/modernizr-3.5.0.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.js";

import routing from './app.routes';

angular.module('rallymetricsui', ['ngRoute'])
    .config(routing)

