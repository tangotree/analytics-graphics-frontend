(function () {
    'use strict';
    angular
        .module('AnalyticsGraphs', [
            'ngRoute',
            'ngResource',
            'ui.bootstrap',
            'tt.controllers.home',
            'tt.controllers.builder',
            'highcharts-ng'
        ])
        .config([
            '$routeProvider',
            '$locationProvider',
            '$httpProvider',
            function ( $routeProvider, $locationProvider, $httpProvider ) {
                $routeProvider.
                    when('/', {
                        controller:     'HomeController',
                        templateUrl:    'app/views/home.html'
                    }).
                    when('/builder', {
                        controller:     'BuilderController',
                        templateUrl:    'app/views/builder.html'
                    }).
                    otherwise({
                        redirectTo:     '/'
                    });

                $locationProvider.hashPrefix('!');

                $locationProvider.html5Mode(true);
            }
        ])
        .run( function run () {
});
}());