$( document ).ready(function() {

// -------------------- DECLARE VARIABLES -------------------- \\

    // Web Interface controls
    console.log('loaded');
    var $controls = $('#controls');
    var $modeButtonWrapper = $('#mode-button-wrapper');

    // Hue System
    var url_ip = 'http://10.159.23.110/api/EhkJrEiZtacHKqMLWLHZ-OMTS7wpcXP87LfjImvn'
        // http://<bridge ip address>/debug/clip.html
        // Haven room: 'http://10.159.23.110/api/EhkJrEiZtacHKqMLWLHZ-OMTS7wpcXP87LfjImvn'
        // Flo's room: 'http://192.168.0.182/api/P5L62etgqpkSUikcmdABFSCox4cOoyk7SIMefkO3',
        // Daniel's room: 'http://192.168.86.31/api/EQMB5CwjE2hYxWK4a-lqCvk9pKN5VoNoTvEACoDz'
    var url_lights = '/groups/0/action';
        // or /lights/3/state (depending on light)

    // Hue Lights
    var stopped;
    const fps = 1/3.0; // frame rate for calling hue functions
    var bri, sat, hue;


// -------------------- DATA -------------------- \\

    // Colours: [transition time, bri, sat, hue]
    const colour_pink = [30,255,255,56100]; // 3 seconds, pink
    // Cycle of colours: [[time,bri,sat,hue], [time,bri,sat,hue]]
    const cycle_seawater = [colour_pink,[30,255,255,25500],[30,255,255,46920]]; // 3 seconds, green, blue

    const waterfall = [[30,59,84,62],[30,55,69,58],[30,70,100,60],[30,55,100,69]];
    // Sunset: ()
    const sunset_a = [[30,15,254,2707],[30,30,126,60053],[30,50,186,52740]];
    const sunset_b = [[30,15,254,7107],[30,30,169,61749],[30,50,254,14727]];

    // Audio
    // var audio = new Audio('audio/HAVEN_Music1.mp3');

    // JSON of mode content

    var data = [

        {
            // First Object is intentionally empty, don't remove
            "name":"modeZero",
            "loops":false,
            "colours":"purple",
            "audio":"audio/mode-zero.mp3",
            "thumbnail": "img/mode-zero-preview.jpg"
        },
        {
            "name":"sunset",
            "loops": true,
            "colours": sunset_a,
            "audio":"audio/mode-one.mp3",
            "thumbnail": "img/mode-one-preview.jpg"},
        {
            "name":"waterfall",
            "loops": true,
            "colours": waterfall,
            "audio":"audio/mode-two.mp3",
            "thumbnail": "img/mode-two-preview.jpg"},
        {
            "name":"cycle_seawater",
            "loops":true,
            "colours":cycle_seawater,
            "audio":"audio/mode-three.mp3",
            "thumbnail": "img/mode-three-preview.jpg"
        },
        {
            "name":"modeFour",
            "loops":false,
            "colours":"orange",
            "audio":"audio/mode-four.mp3",
            "thumbnail": "img/mode-four-preview.jpg"
        }
    ]


// -------------------- HELPER FUNCTIONS -------------------- \\

    function convertColourArrayToAjax(colour_theme) {
        // takes an array of four int color values [transitiontime, bri, sat, hue]
        // returns ajax string format
        tt = colour_theme[0];
        bri = colour_theme[1];
        sat = colour_theme[2];
        hue = colour_theme[3];

       return('{"on":true, "transitiontime":' + tt + ', "bri":' + bri + ', "sat":' + sat + ', "hue":' + hue + '}');
    }

    function fetchAudioAndPlay(audioFile) {
        // fetch(audioFile);
        return audioFile.play();
    }

// -------------------- LIGHT LOOPS -------------------- \\

    // inputs a loop array of colour arrays [[time, bri, sat, hue]]
    function updateExperience(light_cycle){
        console.log('\nstarting updateExperience');

        // track if stop button has been pressed; mode is still continuing if not
        if (!stopped) {
            console.log('!stopped: ', stopped);

            //
            for (var i = 0; i < light_cycle.length; i++) {
                (function(n){
                    setTimeout(function(){
                        console.log(n, light_cycle[n]);
                        $.ajax({
                            url: url_ip+url_lights,
                            type: 'PUT',
                            data: convertColourArrayToAjax(light_cycle[n]),
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
                for (i = 0; i < light_cycle.length; i++) {
                    console.log(i, light_cycle[i]);
                    $.ajax({
                        url: url_ip+url_lights,
                        type: 'PUT',
                        data: convertColourArrayToAjax(light_cycle[i]),
                        success: function() {
                        }
                    });
                }
            }, 1000/fps);
            */

            if (!stopped) {
                console.log('!stopped2: ', stopped)
                setTimeout(function() {
                    updateExperience(light_cycle);
                }, 1000/fps);
            }
        }
    }

  	function startExperience_old(light_cycle,audio){
        // alert(selected.light);
        audioFile = new Audio(audio);
        fetchAudioAndPlay(audioFile);

        console.log('from startExperience function', light, audio)


        // IF LINEAR:
        // Hue API
        $.ajax({
            url: url_ip+url_lights,
            type: 'PUT',
                // this one makes a nice simple colour loop but we probably won't need to use it
            //data: '{"on":true,"bri":255,"sat":255,"hue":46920, "effect":"colorloop"}',
            data: convertColourArrayToAjax(colour_pink),
            success: function () {
            }
        });

        // IF THERE IS A LOOP:
        updateExperience(light_cycle);

    }

    function startExperience(isLoops,colours,audio){
        // alert(selected.light);
        if (audio) {
            console.log('there is an audio!');
            audioFile = new Audio(audio);
            fetchAudioAndPlay(audioFile);
        }

        console.log('from startExperience function')

        for (var i = 0; i < colours.length; i++) {
            (function(n){
                setTimeout(function(){
                    console.log(n, colours[n]);
                    $.ajax({
                        url: url_ip+url_lights,
                        type: 'PUT',
                        data: convertColourArrayToAjax(colours[n]),
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
            for (i = 0; i < lights.length; i++) {
                console.log(i, lights[i]);
                $.ajax({
                    url: url_ip+url_lights,
                    type: 'PUT',
                    data: convertColourArrayToAjax(lights[i]),
                    success: function() {
                    }
                });
            }
        }, 1000/fps);
        */

        if (isLoops) {
            if (!stopped) {
                console.log('!stopped2: ', stopped)
                setTimeout(function() {
                    startExperience(isLoops,colours,'');
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
        audioFile.pause();
    }


// -------------------- BUTTON FUNCTIONS -------------------- \\

    $(document).on('click', '.mode-button', function(){
        console.log('mode click');
        // Show controls
        $controls.fadeIn(1000);
        console.log('controls fade in');
        // Get the selected mode
        var dataMode = $(this).attr('data-mode');
        // Assign mode to the controls
        $controls.attr('data-mode', dataMode);
        // Hide mode buttons
        $modeButtonWrapper.fadeOut(1000);
        $('body').attr('data-mode', dataMode);
    });

    $('#startButton').on('click', function(){
        // Hide Start Button and show stop button
        $(this).fadeOut();
        $("#stopButton").fadeIn();

        var dataMode = $("#controls").attr('data-mode'),
            index = 0;


        var selectedMode = data.find(function(mode, i){
            if(mode.name === dataMode){
                index = i;
                return i;
            }
        });

        var selectedModeIsLoops = selectedMode.loops,
            selectedModeColours = selectedMode.colours,
            selectedModeAudio = selectedMode.audio;

        startExperience(selectedModeIsLoops, selectedModeColours, selectedModeAudio);
        stopped = false;
        console.log('selectedModeIsLoops ', selectedModeIsLoops);
        //updateExperience(selectedModeLight);

    });

    $('#stopButton').on('click', function(){
        console.log('clicked stop');
        $(this).fadeOut();
        $("#startButton").fadeIn();
        stopped = true;
        stopExperience();
    });

    $("#backButton").on('click', function(){

        $controls.fadeOut();
        $modeButtonWrapper.fadeIn();
        $('body').attr('data-mode', '');

        // stopExperience();
    });


    //HANDLEBARS TEMPLATING SCRIPTS
    var $placeHolder = $("#placeholder")
    var $secondPlaceholder = $("#secondPlaceholder");

// -------------------- HANDLEBAR JS -------------------- \\
    var handlebarsTemplate = $("#handlebars-template").html()
    var secondTemplate = $("#second-template").html()
    var templateCompile = Handlebars.compile(handlebarsTemplate)
    var secondTemplateCompile = Handlebars.compile(handlebarsTemplate)
    var secondTemplateCompile = Handlebars.compile(secondTemplate)
    var processedData = data;
    $placeHolder.html(templateCompile(processedData));
    $secondPlaceholder.html(secondTemplateCompile(processedData));

});
