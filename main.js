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

    function sleep(milliseconds) {
        var currentTime = new Date().getTime();
        while (currentTime + milliseconds >= new Date().getTime()) {
        }
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
        console.log('cycle_theme in updateExperience ', cycle_theme);
        if (!stopped) {

            console.log('stopped: ', stopped);
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

            if (!stopped) {
                setTimeout(function() {
                    updateExperience(cycle_theme);
                }, 1000/fps);
            }


            /*
            requestAnimFrame(function() {
                updateExperience(cycle_theme);
            });
            */
        }
/*
        requestAnimFrame(function() {
            updateExperience(cycle_theme);
        });
*/
    }

  	function stopExperience(){

  		audioFile.pause();

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

        stopped = true;
        console.log('clicked stop');
    	stopExperience();
    });

});

