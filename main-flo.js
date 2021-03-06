$( document ).ready(function() {

  	var audio = new Audio('audio/HAVEN_Music1.mp3');
    var url_ip = 'http://10.159.23.110/api/EhkJrEiZtacHKqMLWLHZ-OMTS7wpcXP87LfjImvn'
        // http://<bridge ip address>/debug/clip.html
        // Haven room: 'http://10.159.23.110/api/EhkJrEiZtacHKqMLWLHZ-OMTS7wpcXP87LfjImvn'
        // Flo's room: 'http://192.168.0.182/api/P5L62etgqpkSUikcmdABFSCox4cOoyk7SIMefkO3',
        // Daniel's room: 'http://192.168.86.31/api/EQMB5CwjE2hYxWK4a-lqCvk9pKN5VoNoTvEACoDz'
    var url_lights = '/groups/0/action';
        // or /lights/3/state (depending on light)

    var stopped;
    var fps = 1/3.0;
    var bri, sat, hue;
    var colour_pink = [30,255,255,56100]; // 3 seconds, pink
    var cycle_seawater = [[30,255,255,25500],[30,255,255,46920]]; // 3 seconds, green, blue
/*
    window.requestAnimFrame = (function() {
        return  window.requestAnimationFrame        ||
                window.webkitRequestAnimationFrame  ||
                window.mozRequestAnimationFrame     ||
                function( callback ) {
                    window.setTimeout(callback, 1000 / fps);
                };
    })();
*/
    function convertColourArrayToAjax(colour_theme){
        // takes an array of four int color values [transitiontime, bri, sat, hue]
        // returns ajax string format
        tt = colour_theme[0];
        bri = colour_theme[1];
        sat = colour_theme[2];
        hue = colour_theme[3];

        return('{"on":true, "transitiontime":' + tt + ', "bri":' + bri + ', "sat":' + sat + ', "hue":' + hue + '}');
    }

  	function startExperience(){
        console.log('starting');
        $.ajax({
            url: url_ip+url_lights,
            type: 'PUT',
                // this one makes a nice simple colour loop but we probably won't need to use it
            //data: '{"on":true,"bri":255,"sat":255,"hue":46920, "effect":"colorloop"}',
            data: convertColourArrayToAjax(colour_pink),
            success: function () {
            }
        });
  		audio.play();
  	}

    function updateExperience(cycle_theme){
        console.log('\nstarting updateExperience');

        if (!stopped) {
            console.log('!stopped: ', stopped);

            for (var i = 0; i < cycle_theme.length; i++) {
                (function(n){
                    setTimeout(function(){
                        console.log(n, cycle_theme[n]);
                        $.ajax({
                            url: url_ip+url_lights,
                            type: 'PUT',
                            data: convertColourArrayToAjax(cycle_theme[n]),
                            success: function() {
                            }
                        });
                    }, 1000/fps);
                }(i));
            }
// somehow fix the timing for actual lights within the cycle.
// try solution above, research more

/*
            setTimeout(function() {
                for (i = 0; i < cycle_theme.length; i++) {
                    console.log(i, cycle_theme[i]);
                    $.ajax({
                        url: url_ip+url_lights,
                        type: 'PUT',
                        data: convertColourArrayToAjax(cycle_theme[i]),
                        success: function() {
                        }
                    });
                }
            }, 1000/fps);
*/

            if (!stopped) {
                console.log('!stopped2: ', stopped)
                setTimeout(function() {
                    updateExperience(cycle_theme);
                }, 1000/fps);
            }


        }
    }

  	function stopExperience(){
        $.ajax({
            url: url_ip+url_lights,
            type: 'PUT',
            data: '{"on":false}',
            success: function () {
            }
        });

  		audio.pause();
  	}


    $('#startButton').on('click', function(){
        stopped = false;
    	startExperience();
        console.log('cycle_seawater ', cycle_seawater);
        updateExperience(cycle_seawater);
        /*
        requestAnimFrame(function() {
            console.log('test 2');
            updateExperience(cycle_seawater);
        });
        */
    });

    $('#stopButton').on('click', function(){
        stopped = true;
        console.log('clicked stop');
    	stopExperience();
    });

});
