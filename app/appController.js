(function ()
{
    'use strict';

    var decode_base64;

    if (window.atob) {
        decode_base64 = function (base64data)
        {
            var data = atob(base64data);
            var image = Array(data.length);
            var ix;

            for (ix = 0; ix < data.length; ix++) {
                image[ix] = data.charCodeAt(ix);
            }

            return image;
        }
    } else {
        /* No atob() in Internet Explorer, so we have to invent our own.
         This implementation is adapted from Parchment. */
        var b64decoder = (function ()
        {
            var b64encoder = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var out = [];
            var ix;
            for (ix = 0; ix < b64encoder.length; ix++) {
                out[b64encoder.charAt(ix)] = ix;
            }
            return out;
        })();

        decode_base64 = function (base64data)
        {
            var out = [];
            var c1, c2, c3, e1, e2, e3, e4;
            var i = 0, len = base64data.length;
            while (i < len) {
                e1 = b64decoder[base64data.charAt(i++)];
                e2 = b64decoder[base64data.charAt(i++)];
                e3 = b64decoder[base64data.charAt(i++)];
                e4 = b64decoder[base64data.charAt(i++)];
                c1 = (e1 << 2) + (e2 >> 4);
                c2 = ((e2 & 15) << 4) + (e3 >> 2);
                c3 = ((e3 & 3) << 6) + e4;
                out.push(c1, c2, c3);
            }
            if (e4 == 64) {
                out.pop();
            }
            if (e3 == 64) {
                out.pop();
            }
            return out;
        }
    }

    function appController($http, $quixe)
    {
        var ctrl = this;
        var src = 'stories/fyretester.ulx.json';
        var format = 'base64';

        this.buffer = '';
        var readkey = false;

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

        $http.get(src).then(function (data)
        {
            var image = data.data.base64;
            image = decode_base64(image);
            $quixe.prepare(image, {});
            $quixe.init();
        });

        $quixe.on('ready', function (data)
        {
            console.log('ready', JSON.stringify(data));
            ctrl.buffer += data.MAIN + '\n';
        });

        $quixe.on('snapshot', function ()
        {
            console.log('snapshot');
        });
        $quixe.on('fatal_error', function ()
        {
            console.log('fatal_error',arguments);
        });

        $quixe.on('readkey', function ()
        {
            readkey = true;
            console.log('readkey');
        });
    }

    angular.module('quixeApp').controller('appController', appController);
})();
