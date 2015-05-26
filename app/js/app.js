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
            'highcharts-ng',
            'vxWamp'
        ])
        .config([
            '$routeProvider',
            '$locationProvider',
            '$wampProvider',
            function ( $routeProvider, $locationProvider, $wampProvider ) {
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

                var wampBaseUrl = "ws://127.0.0.1:8080/ws";
                var realm = "realm1";
                $wampProvider.init({
                    url: wampBaseUrl,
                    realm: realm
                });
            }
        ])
        .run(function($wamp){
            $wamp.open();
        });
}());
