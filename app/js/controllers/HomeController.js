(function () {
    'use strict';
    angular
        .module('tt.controllers.home', [])
        .controller('HomeController', [
            '$scope',
            '$resource',
            'buildFactory',
            function ( $scope, $resource, buildFactory ) {
                $scope.chartsIds = [];
                $scope.charts = [];

                buildFactory.then(function (response) {
                    var baseUrl = response.data.baseUrl;
                    var chartsConfig = response.data.dashboard.charts;

                    chartsConfig.forEach(function (chartConfig) {
                        $scope.chartsIds.push(chartConfig.chartId);
                        loadChart(baseUrl, chartConfig.chartId);
                    });
                });

                function loadChart(baseUrl, chartId) {
                    var chartDivId = 'chart' + chartId;

                    var ChartData = $resource(baseUrl + '/api?chartId=' + chartId);
                    var user = ChartData.get(function (data) {
                        var chart = new Highcharts.StockChart({
                            chart: {
                                renderTo: chartDivId,
                                zoomType: 'x'
                            },
                            legend: {
                                enabled: true
                            },
                            plotOptions: {
                                series: {
                                    dataGrouping: {
                                        enabled: false
                                    }
                                }
                            },
                            series: data.series,
                            title: {
                                text: data.title
                            },
                            rangeSelector: {
                                selected: 5,
                                inputEnabled: false
                            }
                        });

                        $scope.charts.push(chart);
                    });
                }
            }
        ]);
}());