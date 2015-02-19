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
                    from: '-30 days',
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
                    { "id": "day", "title": "Day"},
                    { "id": "week", "title": "Week" },
                    { "id": "month", "title": "Month" },
                    { "id": "hour", "title": "Hour" },
                    { "id": "minute", "title": "Minute" },
                    { "id": "three_hour", "title": "Three Hour" },
                    { "id": "six_hour", "title": "Six Hour" },
                    { "id": "twelve_hour", "title": "Twelve Hour" }
                ];

                $scope.chart_types = [  
                    { "id": "line", "title": "Line"},
                    { "id": "column", "title": "Column"},
                    { "id": "stackedArea", "title": "Stacked Area"},
                    { "id": "summarizedColumn", "title": "Summarized Column"},
                    { "id": "summarizedPie", "title": "Summarized Pie"},
                    { "id": "percentageArea", "title": "Percentage Area"},
                    { "id": "stackedColumns", "title": "Stacked Columns"},
                    { "id": "table", "title": "Table"},
                    { "id": "lineWithoutMarkers", "title": "Line Without Markers"}
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
                    var promise = chartFactory.get($scope.builder_options);

                    promise.then(function(response) {
                        $scope.chart1 = new Highcharts.StockChart({
                             chart: {
                                renderTo: 'chart1'
                             },
                             series: response.series,
                             title: {
                                 text: 'Test'
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

