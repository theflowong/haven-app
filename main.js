$( document ).ready(function() {

  	var audio = new Audio('audio/sample-audio.mp3');
    var url_ip = 'http://192.168.0.182/api/P5L62etgqpkSUikcmdABFSCox4cOoyk7SIMefkO3'
        // Flo's room: 'http://192.168.0.182/api/P5L62etgqpkSUikcmdABFSCox4cOoyk7SIMefkO3',
        // Daniel's room: 'http://192.168.86.31/api/EQMB5CwjE2hYxWK4a-lqCvk9pKN5VoNoTvEACoDz'
    var url_lights = '/groups/0/action';
        // or /lights/3/state (depending on light)

    var bri, sat, hue;
    var colour_seawater = [255,255,21400];
    var cycle_experiment = [[255,255,00400],[10,255,45000]]

    function convertColourArrayToDict(colour_theme){
        // takes an array of three int color values [bri, sat, hue]
        // returns ajax string format

        bri = colour_theme[0];
        sat = colour_theme[1];
        hue = colour_theme[2];

        console.log('b: ' + bri + ', s: ' + sat + ', h: ' + hue);
            // for testing purposes

        return('{"on":true, "bri":' + bri + ', "sat":' + sat + ', "hue":' + hue + '}');
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

        setTimeout(function() {
            for (i = 0; i < cycle_theme.length; i++) {
                console.log(i + ' timeout', cycle_theme[i]);
                $.ajax({
                    url: url_ip+url_lights,
                    type: 'PUT',
                    data: convertColourArrayToDict(cycle_theme[i]),
                    success: function() {
                    }
                });
            }
        }, 5000);

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
        updateExperience(cycle_experiment);
    });


    $('#stopButton').on('click', function(){
    	stopExperience();
    });


});
