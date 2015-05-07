(function ()
{
    'use strict';

    function giLoad( $http, $giLoad )
    {
        function linkFunction(scope, elem, attrs)
        {
            $http.get( attrs.src ).then( function ( data )
            {
                $giLoad.load_run(null, data.data.base64, 'base64');
            } );
        }

        return {
            restrict: 'EA',
            link: linkFunction
        }
    }

    angular.module('quixeApp').directive('giLoad', giLoad);
})();