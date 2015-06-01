(function ()
{
    'use strict';

    angular.module('quixe', ['LocalStorageModule']).config(function (localStorageServiceProvider)
    {
        localStorageServiceProvider.setPrefix('quixe:save');
    });

})();
