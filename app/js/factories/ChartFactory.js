(function () {
    'use strict';
    angular
        .module('tt.factories.chart', [])
        .factory('chartFactory', [
            '$resource',
            '$q',
            'buildFactory',
            function( $resource, $q, buildFactory) {
                return {
                    'get': function(params) {
                        var loadConfig = function() {
                            return buildFactory.then(function(response){
                                return response.data.baseUrl;
                            });
                        },
                        getData = function(baseUrl) {
                            var Builder = $resource(baseUrl + '/api/builder');

                            var deferred = $q.defer();

                            Builder.get(params, function(data){
                                deferred.resolve(data);
                            });

                            return deferred.promise;
                        };

                        return loadConfig().then(getData);
                    }
                };
            }
        ]);
}());