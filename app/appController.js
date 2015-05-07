(function ()
{
    'use strict';

    function appController( $http, $giLoad )
    {
        var src = 'stories/glulxercise.ulx.json';
        var format = 'base64';

        $http.get( src ).then( function ( data )
        {
            $giLoad.load_run(null, data.data.base64, format);
        } );
    }

    angular.module('quixeApp').controller('appController', appController);
})();