(function () {
    'use strict';
    angular
        .module('AnalyticsGraphs', [
            'ngRoute',
            'ngResource',
            'ui.bootstrap',
            'tt.controllers.home',
            'tt.controllers.realtime',
            'tt.controllers.builder',
            'tt.directives.menu',
            'tt.factories.chart',
            'tt.factories.build',
            'highcharts-ng'
        ])
        .config([
            '$routeProvider',
            '$locationProvider',
            function ( $routeProvider, $locationProvider ) {
                $routeProvider.
                    when('/', {
                        controller:     'HomeController',
                        templateUrl:    'app/views/home.html'
                    }).
                    when('/realtime', {
                        controller:     'RealtimeController',
                        templateUrl:    'app/views/realtime.html'
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
        .run( function run () {});
}());