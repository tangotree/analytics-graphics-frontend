(function () {
    'use strict';
    angular
        .module('tt.controllers.builder', [])
        .controller('BuilderController', [
            '$scope',
            '$http',
            'chartFactory',
            function ( $scope, $http, chartFactory) {
                $scope.builder_options = {
                    from: '-3 days',
                    to: 'now',
                    compare_to: '',
                    granularity: 'day',
                    chart_type: 'line',
                    application: '',
                    dimension: '',
                    metric: '',
                    platform: 'web'
                };

                $scope.granularities = [
                    { "id": "minute", "title": "Minute" },
                    { "id": "hour", "title": "Hour" },
                    { "id": "three_hour", "title": "Three Hour" },
                    { "id": "six_hour", "title": "Six Hour" },
                    { "id": "twelve_hour", "title": "Twelve Hour" },
                    { "id": "day", "title": "Day"},
                    { "id": "week", "title": "Week" },
                    { "id": "month", "title": "Month" }
                ];

                $scope.chart_types = [  
                    { "id": "line", "title": "Line"},
                    { "id": "column", "title": "Column"},
                    { "id": "area", "title": "Stacked Area"}
                ];

                $scope.applications = [
                    'MT'
                ];

                $scope.dimensions = [];

                $http({
                    url: './data/dimensions.json'
                }).then(function (response) {
                    $scope.dimensions = response.data;
                });
                $scope.metrics = [];

                $http({
                    url: './data/metrics.json'
                }).then(function (response) {
                    $scope.metrics = response.data;
                });

                $scope.sendQuery = function() {
                    var chart_options = JSON.parse(JSON.stringify($scope.builder_options));
                    chart_options['metric'] = $scope.builder_options['metric']['id'];
                    var promise = chartFactory.get(chart_options);

                    promise.then(function(response) {
                        $scope.chart1 = new Highcharts.StockChart({
                            chart: {
                                renderTo: 'chart1',
                                zoomType: 'x',
                                type: chart_options['chart_type']
                            },
                            plotOptions: {
                                series: {
                                    dataGrouping: {
                                        enabled: false
                                    }
                                }
                            },
                            series: response.series,
                            title: {
                                text: response.title
                            },
                            rangeSelector: {
                                selected: 5
                            }
                        });
                    }, function(reason) {
                        alert('Failed: ' + reason);
                    });
                };
            }
        ]);
}());

