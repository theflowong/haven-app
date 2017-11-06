$( document ).ready(function() {
  
    // JSON of mode content
    var data = [
      {"name":"modeZero","light":"purple","audio":"audio/mode-zero.mp3", "thumbnail": "img/mode-zero-preview.jpg"},
      {"name":"modeOne","light":"red","audio":"audio/mode-one.mp3", "thumbnail": "img/mode-one-preview.jpg"},
      {"name":"modeTwo","light":"blue","audio":"audio/mode-two.mp3", "thumbnail": "img/mode-two-preview.jpg"},
      {"name":"modeThree","light":"green","audio":"audio/mode-three.mp3", "thumbnail": "img/mode.jpg"},
      {"name":"modeFour","light":"orange","audio":"audio/mode-four.mp3", "thumbnail": "img/mode.jpg"}
    ]

    var $controls = $('#controls');
    var $modeButtonWrapper = $('#mode-button-wrapper');

    $('.mode-button').on('click', function(){
      
      // Show controls
      $controls.fadeIn(2000);
      // Get the selected mode
      var dataMode = $(this).attr('data-mode');
      // Assign mode to the controls
      $controls.attr('data-mode', dataMode);
      // Hide mode buttons
      $modeButtonWrapper.fadeOut(1000);
      $('body').attr('data-mode', dataMode);


    });


  	function startExperience(light,audio){
  		// ADD HUE API STUFF HERE
      // alert(selected.light);
      audioFile = new Audio(audio);
  		audioFile.play();
      console.log('from startExperience function', light, audio)
 
  	}

  	function stopExperience(){
  		audioFile.pause();
  	}




    $('#startButton').on('click', function(){

      // Hide Start Button and show stop button
      $(this).fadeOut();
      $("#stopButton").fadeIn();

      var dataMode = $("#controls").attr('data-mode'),
          index = -1;

      var selectedMode = data.find(function(item, i){
        if(item.name === dataMode){
          index = i;
          return i;
        }
      });

      var selectedModeLight = selectedMode.light,
          selectedModeAudio  = selectedMode.audio;

      startExperience(selectedModeLight, selectedModeAudio);

    });


    $('#stopButton').on('click', function(){
      $(this).fadeOut();
      $("#startButton").fadeIn();

    	stopExperience();
    });

    $("#backButton").on('click', function(){
      
      $controls.fadeOut();
      $modeButtonWrapper.fadeIn();
      $('body').attr('data-mode', '');

      // stopExperience();
    });


});