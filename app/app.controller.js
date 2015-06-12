(function ()
{
    'use strict';

    function appController($http, $quixe, localStorageService)
    {
        var ctrl = this;
        var src = 'stories/fyretester.ulx.json';
        var save;

        this.buffer = '';
        var readkey = false;

        this.selectedSave = null;

        this.send = function ()
        {
            if (readkey) {
                $quixe.readkey_resume(this.input.charCodeAt(0));
            } else {
                $quixe.readline_resume(this.input);
            }
            readkey = false;
            this.input = '';
        };


        var refreshSaveList = function ()
        {
            ctrl.saves = localStorageService.keys();
        };

        refreshSaveList();

        this.save = function ()
        {
            ctrl.input = 'save';
            ctrl.send();
        };

        this.load = function ()
        {
            $quixe.restore_state(localStorageService.get(ctrl.selectedSave));
            ctrl.selectedSave = null;
            ctrl.buffer = '';
        };

        $http.get(src).then(function (data)
        {
            $quixe.load(data);
        });


        $quixe.on('save', function ()
        {
            localStorageService.set(new Date().toString(), $quixe.get_state());
            refreshSaveList();
        });

        $quixe.on('load', function ()
        {

            ctrl.selectedSave = ctrl.selectedSave || ctrl.saves[ ctrl.saves.length - 1 ];
            if (!ctrl.selectedSave) {
                return;
            }
            $quixe.restore_state(localStorageService.get(ctrl.selectedSave));
            ctrl.selectedSave = null;
        });

        $quixe.on('ready', function (data)
        {
            console.log('ready', JSON.stringify(data));
            ctrl.buffer += data.MAIN + '\n';
        });

        $quixe.on('snapshot', function (data)
        {
            console.log('snapshot', data);
        });
        $quixe.on('fatal_error', function (error)
        {
            console.log('fatal_error', error);
        });

        $quixe.on('readkey', function ()
        {
            readkey = true;
            console.log('readkey');
        });
    }

    angular.module('quixe').controller('app', appController);
})();
