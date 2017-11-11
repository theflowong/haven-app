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

    // Colours: [time, bri, sat, hue]
    const colour_pink = [30,255,255,56100]; // 3 seconds, pink
    // Cycle of colours: [[time,bri,sat,hue], [time,bri,sat,hue]]
    const cycle_seawater = [colour_pink,[30,255,255,25500],[30,255,255,46920]]; // 3 seconds, green, blue

    const waterfall = [[30,59,84,62],[30,55,69,58],[30,70,100,60],[30,55,100,69]];
    // Sunset: ()
    const sunset_a = [[30,15,0,0],[30,30,0,0],[30,50,0,0]];
    const sunset_b = [[30,15,0,0],[30,30,0,0],[30,50,0,0]];

    // Audio
    // var audio = new Audio('audio/HAVEN_Music1.mp3');

    // JSON of mode content

    var data = [

        {
            // First Object is intentionally empty, don't remove
            "name":"modeZero",
            "light":"purple",
            "audio":"audio/mode-zero.mp3",
            "thumbnail": "img/mode-zero-preview.jpg"
        },
        {
            "name":"modeOne",
            "light": cycle_seawater,
            "audio":"audio/mode-one.mp3",
            "thumbnail": "img/mode-one-preview.jpg"},
        {
            "name":"modeTwo",
            "light":"blue",
            "audio":"audio/mode-two.mp3",
            "thumbnail": "img/mode-two-preview.jpg"},
        {
            "name":"modeThree",
            "light":"green",
            "audio":"audio/mode-three.mp3",
            "thumbnail": "img/mode-three-preview.jpg"
        },
        {
            "name":"modeFour",
            "light":"orange",
            "audio":"audio/mode-four.mp3",
            "thumbnail": "img/mode-four-preview.jpg"
        }
    ]



// -------------------- HELPER FUNCTIONS -------------------- \\
    function colourXYtoRGB(x,y,brightness) {
        // takes in colour value of floats x, y and returns colour value in RGB
        // https://developers.meethue.com/documentation/color-conversions-rgb-xy

        // calculate XYZ values Convert
        var x = x;
        var y = y;
        var z = 1.0 - x - y;
        var Y = brightness;
        var X = (Y / y) * x;
        var Z = (Y / y) * z;

        // calculate RGB using Wide RGB D65 conversion
        var r = X*1.656492 - Y*0.354851 - Z*0.255038;
        var g = -X*0.707196 + Y*1.655397 + Z*0.036152;
        var b =  X*0.051713 - Y*0.121364 + Z*1.011530;

        // apply reverse gamma correction
        r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * pow(r, (1.0 / 2.4)) - 0.055;
        g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * pow(g, (1.0 / 2.4)) - 0.055;
        b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * pow(b, (1.0 / 2.4)) - 0.055;

        return r,g,b;
    }

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

    // inputs an array of colour arrays [time, bri, sat, hue]
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

  	function startExperience(light,audio){
        // alert(selected.light);
        audioFile = new Audio(audio);

        console.log('from startExperience function', light, audio)

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

        fetchAudioAndPlay(audioFile);


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

        var selectedModeLight = selectedMode.light,
            selectedModeAudio = selectedMode.audio;

        startExperience(selectedModeLight, selectedModeAudio);

        stopped = false;
        console.log('selectedModeLight ', selectedModeLight);
        updateExperience(selectedModeLight);

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
