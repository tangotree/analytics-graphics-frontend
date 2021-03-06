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
                                return response;
                            });
                        },
                        getData = function(promise) {
                            var baseUrl = promise.data.baseUrl;
                            var Builder = $resource(baseUrl + '/api/builder');

                            var deferred = $q.defer();

                            var json_params = angular.toJson(params, false);
                            Builder.get({"query": json_params}, function(data){
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