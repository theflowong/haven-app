$( document ).ready(function() {
  
  	var audio = new Audio('audio/sample-audio.mp3');


  	function startExperience(){
  		// ADD HUE API STUFF HERE
  		audio.play();
  	}

  	function stopExperience(){
  		audio.pause();
  	}


    $('#startButton').on('click', function(){
    	startExperience();
    });


    $('#stopButton').on('click', function(){
    	stopExperience();
    });


});