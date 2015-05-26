(function () {
    'use strict';
    angular
        .module('tt.controllers.realtime', [])
        .controller('RealtimeController', [
            '$scope',
            '$resource',
            '$wamp',
            function ( $scope, $resource, $wamp) {
                $wamp.open();

                function onevent(args) {
                    var shouldShift = false;

                    args.forEach(function(point){
                        var numberOfPointsAdded = $scope.chart.series[0].points.length;

                        if (numberOfPointsAdded > 10) {
                            shouldShift = true;
                        }

                        $scope.chart.series[0].addPoint({x: point[0], y: point[1]}, true, shouldShift);
                    });
                }
                $wamp.subscribe('com.myapp.test', onevent);

                $scope.$on("$wamp.open", function (event, session) {
                    console.log('We are connected to the WAMP Router!');
                    $scope.chart = new Highcharts.StockChart({
                        chart: {
                            renderTo: 'chart'
                        },
                        series: [
                            {data: []}
                        ],
                        title: {
                            text: 'Realtime amazing graphics'
                        },
                        rangeSelector: {
                            selected: 5
                        },
                        navigator: {
                            enabled: false
                        }
                    });
                });
            }
        ]);
}());
