$( document ).ready(function() {

  	var audio = new Audio('audio/sample-audio.mp3');


  	function startExperience(){
        $.ajax({
            url: 'http://192.168.86.31/api/EQMB5CwjE2hYxWK4a-lqCvk9pKN5VoNoTvEACoDz/groups/0/action',
//            Flo's room:
//            url: 'http://192.168.0.182/api/P5L62etgqpkSUikcmdABFSCox4cOoyk7SIMefkO3'
            type: 'PUT',
//            this one makes a nice simple colour loop but we probably won't need to use it
//            data: '{"on":true,"bri":255,"sat":255,"hue":46920, "effect":"colorloop"}',
//            blue
            data: '{"on":true,"bri":255,"sat":255,"hue":46920}',
            success: function () {
            }
        });

  		audio.play();
  	}

  	function stopExperience(){
        $.ajax({
            url: 'http://192.168.86.31/api/EQMB5CwjE2hYxWK4a-lqCvk9pKN5VoNoTvEACoDz/groups/0/action',
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
