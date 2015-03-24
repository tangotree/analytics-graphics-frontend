(function () {
    'use strict';
    angular
        .module('tt.directives.menu', [])
        .directive('menu', [
            '$location',
            function ($location) {
                return {
                    templateUrl: 'app/views/nav/menu.html',
                    controller: [
                        '$scope',
                        '$location',
                        function ($scope, $location) {
                            $scope.location = $location.path();

                            $scope.go = function(view) {
                                $location.path(view);
                            	$scope.location = $location.path();
                            };
                        }
                    ]
                };
            }
        ]);
})();
