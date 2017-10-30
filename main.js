$( document ).ready(function() {

  	var audio = new Audio('audio/sample-audio.mp3');
    var url_ip = 'http://192.168.0.182/api/P5L62etgqpkSUikcmdABFSCox4cOoyk7SIMefkO3'
      // Flo's room: 'http://192.168.0.182/api/P5L62etgqpkSUikcmdABFSCox4cOoyk7SIMefkO3',
      // Daniel's room: 'http://192.168.86.31/api/EQMB5CwjE2hYxWK4a-lqCvk9pKN5VoNoTvEACoDz'
    var url_lights = '/groups/0/action';
      // or /lights/3/state (depending on light)

    var bri, sat, hue;
    var sea_water = ['255','255','11400'];

    function updateLoop(colour_theme){
      // creates ajax string for updating loop based on colour theme values
      bri = colour_theme[0];
      sat = colour_theme[1];
      hue = colour_theme[2];
      return('{"on":true, "bri":' + bri + ', "sat":' + sat + ', "hue":' + hue + '}');
    }

  	function startExperience(){

        $.ajax({
            url: url_ip+url_lights,
            type: 'PUT',
//            this one makes a nice simple colour loop but we probably won't need to use it
//            data: '{"on":true,"bri":255,"sat":255,"hue":46920, "effect":"colorloop"}',
//            blue
            data: updateLoop(sea_water),
            success: function () {
            }
        });

  		audio.play();
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
    });


    $('#stopButton').on('click', function(){
    	stopExperience();
    });


});
