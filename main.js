$( document ).ready(function() {

  	var audio = new Audio('audio/sample-audio.mp3');
    var url_ip = 'http://192.168.0.182/api/P5L62etgqpkSUikcmdABFSCox4cOoyk7SIMefkO3'
        // Flo's room: 'http://192.168.0.182/api/P5L62etgqpkSUikcmdABFSCox4cOoyk7SIMefkO3',
        // Daniel's room: 'http://192.168.86.31/api/EQMB5CwjE2hYxWK4a-lqCvk9pKN5VoNoTvEACoDz'
    var url_lights = '/groups/0/action';
        // or /lights/3/state (depending on light)

    var bri, sat, hue;
    var colour_seawater = [30,255,255,56100]; // 3 seconds, pink
    var cycle_experiment = [[30,255,255,25500],[30,255,255,46920]] // 3 seconds, green, blue

    function convertColourArrayToDict(colour_theme){
        // takes an array of four int color values [transitiontime, bri, sat, hue]
        // returns ajax string format
        tt = colour_theme[0]
        bri = colour_theme[1];
        sat = colour_theme[2];
        hue = colour_theme[3];

        return('{"on":true, "transitiontime":' + tt + ', "bri":' + bri + ', "sat":' + sat + ', "hue":' + hue + '}');
    }

    function sleep(milliseconds) {
        var currentTime = new Date().getTime();
        while (currentTime + milliseconds >= new Date().getTime()) {
        }
    }

  	function startExperience(){
        $.ajax({
            url: url_ip+url_lights,
            type: 'PUT',
                // this one makes a nice simple colour loop but we probably won't need to use it
                // data: '{"on":true,"bri":255,"sat":255,"hue":46920, "effect":"colorloop"}',
            data: convertColourArrayToDict(colour_seawater),
            success: function () {
            }
        });
  		audio.play();
  	}

    function updateExperience(cycle_theme){
        for (i = 0; i < cycle_theme.length; i++) {
            sleep(3000); // 3000 milliseconds = 3 second
            console.log(i, cycle_theme[i]);
            $.ajax({
                url: url_ip+url_lights,
                type: 'PUT',
                data: convertColourArrayToDict(cycle_theme[i]),
                success: function() {
                }
            });
        }
        requestAnimationFrame(function() {
            updateExperience(cycle_experiment);
        });
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
    	startExperience();
        requestAnimationFrame(function() {
            updateExperience(cycle_experiment);
        });
    });

    $('#stopButton').on('click', function(){
        console.log('clicked stop');
    	stopExperience();
    });

});
