(function ()
{
    'use strict';

    function appController( $http, $giLoad, $eventEmiter )
    {
        var src = 'stories/glulxercise.ulx.json';
        var format = 'base64';

        $http.get( src ).then( function ( data )
        {
            $giLoad.load_run(null, data.data.base64, format);
        } );

        $eventEmiter.on( 'ready', function() {
            console.log( 'ready fired!' );
        } );

        $eventEmiter.on( 'readline', function() {
            console.log( 'readline fired!', arguments );
        } );

        $eventEmiter.on( 'snapshot', function() {
            console.log( 'snapshot fired!' );
        } );

        $eventEmiter.on( 'readkey', function() {
            console.log( 'readkey fired!', arguments );
        } );
    }

    angular.module('quixeApp').controller('appController', appController);
})();