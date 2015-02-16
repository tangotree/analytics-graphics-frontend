(function () {
    'use strict';
    angular
        .module('tt.controllers.home', [])
        .controller('HomeController', [
            '$scope',
            '$resource',
            function ( $scope, $resource) {
                $scope.data2 = [];
                $scope.chartConfig = {
                    options: {
                        chart: {
                            type: 'line',
                            zoomType: 'x'
                        }
                    },
                    series: [{
                        data: [10, 15, 12, 8, 7, 1, 1, 19, 15, 10]
                    }],
                    title: {
                        text: 'Hello'
                    },
                    xAxis: {currentMin: 0, currentMax: 10, minRange: 1},
                    loading: false
                };

                $scope.chartConfig2 = {
                    options: {
                        chart: {
                            type: 'line',
                            zoomType: 'x'
                        },
                    colors: [
                        "#FF6666",
                        '#f7a35c'
                    ],
                        rangeSelector : {
                            selected : 5
                        }
                    },
                    scrollbar: {
                        enabled: false
                    },
                    series: [{
                        name : 'AAPL Stock Price',
                        marker : {
                            enabled : true,
                            radius : 3
                        },
                        id : 'dataseries',
                        tooltip : {
                            valueDecimals: 4
                        },
                        shadow : true,
                        data: $scope.data2
                    }, {
                        type: 'flags',
                        name: 'Marketing Campaign',
                        data: [{
                            x: Date.UTC(2013, 2, 1),
                            title: 'Marketing Campaign'
                        }, {
                            x: Date.UTC(2013, 3, 1),
                            title: 'Twitter Marketing Campaign'
                        }],
                        shape: 'squarepin'
                    }],
                    title: {
                        text: 'Hello World'
                    },
                    loading: false,
                    useHighStocks: true,
                    xAxis: {currentMin: 0, currentMax: 10, minRange: 1}
                };

                var Test = $resource('http://localhost:8888/test');
                var user = Test.query(function(data) {
                        console.log(data);
                        var resultData = [];
                        data.forEach(function(item){
                            resultData.push({x: item[0], y: item[1]});
                        });
                        console.debug(resultData);
                        $scope.chartConfig2.series[0].data = resultData;
                        $scope.chartConfig2.xAxis.currentMin = resultData[0][0];
                        $scope.chartConfig2.xAxis.currentMax = resultData[resultData.length-1][0];

                });

            }
        ]);
}());