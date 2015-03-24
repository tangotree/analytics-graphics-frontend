(function () {
    'use strict';
    angular
        .module('tt.factories.build', [])
        .factory('buildFactory', [
            '$http',
            function ( $http ) {
                return $http({
                    url: './data/config.json'
                });
            }
        ]);
}());