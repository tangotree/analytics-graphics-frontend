(function () {
    'use strict';
    angular
        .module('tt.controllers.realtime', [])
        .controller('RealtimeController', [
            '$scope',
            '$resource',
            'buildFactory',
            function ( $scope, $resource, buildFactory) {
                buildFactory.then(function (response) {
                    var baseUrl = response.data.baseUrl;
                    var wsBaseUrl = response.data.wsBaseUrl;

                    var ws = new WebSocket(wsBaseUrl + '/ws');
                    ws.onmessage = function(event){
                        var arrayData = JSON.parse(event.data);
                        var response = arrayData.response;
                        for (var key in response) {
                            var point = response[key];
                            console.debug(point);

                            $scope.chart.series[0].addPoint({x: point[0], y: point[1]});
                        }
                    };

                    ws.onopen = function(event) {
                        ws.send('/test:{"name":"my event","args":[{"data":"hola"}]}');
                    };

                    var ChartData = $resource(baseUrl + '/api/builder');
                    var user = ChartData.get({}, function(data) {
                        var resultData = [];

                        data.series[0].data.forEach(function (item) {
                            resultData.push({x: item[0], y: item[1]});
                        });

                        $scope.chart = new Highcharts.StockChart({
                            chart: {
                                renderTo: 'chart'
                            },
                            series: [
                                {data: resultData}
                            ],
                            title: {
                                text: 'Test'
                            },
                            rangeSelector: {
                                selected: 5
                            }
                        });
                    });


                });

            }
        ]);
}());
