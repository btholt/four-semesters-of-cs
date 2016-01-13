'use strict';
(function() {
    var counter = 0;
    var startPres = function(id) {
        var node = document.getElementById(id);
        node.addEventListener('click', handleStart);
    };

    var handleStart = function() {
        showOnly(0);
        document.addEventListener('keyup', advance);
    }

    var advance = function(e) {
        if (e.keyCode === 37) {
            // left arrow
            counter--;
            showOnly(counter);
        }
        else if (e.keyCode === 39) {
            counter++;
            showOnly(counter);
        }
    }

    var showOnly = function(index) {
        var nodes = document.getElementsByTagName('article');


        for (var i = 0; i < nodes.length; i++) {
            if (counter === i) {
                console.log(i, nodes[i]);
                var replace = 'invisible';
                if (nodes[i].className.indexOf(' invisible') >= 0) {
                    replace = ' invisible';
                }

                nodes[i].className = nodes[i].className.replace(replace, '');
                nodes[i].scrollIntoView();
            }
            else if (nodes[i].className.indexOf('invisible') < 0) {
                nodes[i].className += (nodes[i].className.length) ? ' invisible' : 'invisible';
            }
        }
    };

    startPres('start');
})();