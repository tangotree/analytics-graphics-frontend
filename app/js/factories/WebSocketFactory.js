(function () {
    'use strict';
    angular
        .module('tt.factories.websocket', [])
        .factory('websocketFactory', [
            'socketFactory',
            function(socketFactory) {
                var myIoSocket = io.connect('/test');

                var mySocket = socketFactory({
                    ioSocket: myIoSocket
                });

                return mySocket;
            }
        ]);
}());