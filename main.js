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
    var url_allLights = '/groups/0/action';
        // or /lights/3/state (depending on light)

    // Hue Lights
    var stopped;
    const fps = 1; // frame rate for calling hue functions
    var bri, sat, hue;


// -------------------- DATA -------------------- \\

    // Colours: [transition time, bri, sat, hue]
    const colour_pink = [30,255,255,56100]; // 3 seconds, pink
    // Cycle of colours: [[time,bri,sat,hue], [time,bri,sat,hue]]
    const cycle_seawater = [colour_pink,[30,255,255,25500],[30,255,255,46920]]; // 3 seconds, green, blue

    const waterfall = [[30,59,84,62],[30,55,69,58],[30,70,100,60],[30,55,100,69]];
    // Sunset: ()
    const sunset_a = [[500,15,254,254],[500,30,129,63848],[500,50,166,52393]];
    const sunset_b = [[500,15,254,7107],[500,30,177,64107],[500,50,254,7608]];

    // Audio
    // var audio = new Audio('audio/HAVEN_Music1.mp3');

    // JSON of mode content

    var data = [

        {
            // First Object is intentionally empty, don't remove
            "name":"modeZero",
            "loops":false,
            "lights_all":"purple",
            "audio":"audio/mode-zero.mp3",
            "thumbnail": "img/mode-zero-preview.jpg"
        },
        {
            "name":"sunset",
            "loops": false,
            "lights_all": [sunset_a,sunset_b,sunset_a,sunset_b],
            "audio":"audio/mode-one.mp3",
            "thumbnail": "img/mode-one-preview.jpg"},
        {
            "name":"SAD Light Therapy (waterfall)",
            "loops": true,
            "lights_all": [waterfall,waterfall,waterfall,waterfall],
            "audio":"audio/HAVEN_Music1.mp3",
            "thumbnail": "img/mode-two-preview.jpg"},
        {
            "name":"Pulsing Seawater Dance",
            "loops":true,
            "lights_all":[cycle_seawater,cycle_seawater,cycle_seawater,cycle_seawater],
            "audio":"audio/HAVEN_Music1.mp3",
            "thumbnail": "img/mode-three-preview.jpg"
        },
        {
            "name":"modeFour",
            "loops":false,
            "lights_all":"orange",
            "audio":"audio/HAVEN_Music1.mp3",
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

    function sendtoHue(colours) {
        for (var i = 0; i < colours.length; i++) {
            (function(n){
                setTimeout(function(){
                    $.ajax({
                        url: url_ip+'/lights/1/state',
                        type: 'PUT',
                        data: convertColourArrayToAjax(colours[n]),
                        success: function() {
                        }
                    });
                }, 1000/fps);
            }(i));
        }
    }

    function fetchAudioAndPlay(audioFile) {
        // fetch(audioFile);
        return audioFile.play();
    }

// -------------------- LIGHT LOOPS -------------------- \\

    function startExperience(isLoops,lights_all,audio){
        // alert(selected.light);
        if (audio) {
            console.log('there is an audio!');
            audioFile = new Audio(audio);
            fetchAudioAndPlay(audioFile);
        }

        console.log('from startExperience function')

        // don't have same number of transitions?
        // for (var i = 0; i < lights_all.length; i++) {
        //     sendtoHue(lights_all[i]);
        // }

        // assuming they all have the same number of transitions
        for (var i = 0; i < lights_all[0].length; i++) {
            (function(n){
                setTimeout(function(){
                    console.log("lights_all[0]", lights_all[0]);
                    console.log(n, lights_all[0][n]);
                    $.ajax({
                        url: url_ip+'/lights/1/state',
                        type: 'PUT',
                        data: convertColourArrayToAjax(lights_all[0][n]),
                        success: function() {
                        }
                    });
                    $.ajax({
                        url: url_ip+'/lights/2/state',
                        type: 'PUT',
                        data: convertColourArrayToAjax(lights_all[1][n]),
                        success: function() {
                        }
                    });
                    $.ajax({
                        url: url_ip+'/lights/3/state',
                        type: 'PUT',
                        data: convertColourArrayToAjax(lights_all[2][n]),
                        success: function() {
                        }
                    });
                    $.ajax({
                        url: url_ip+'/lights/4/state',
                        type: 'PUT',
                        data: convertColourArrayToAjax(lights_all[3][n]),
                        success: function() {
                        }
                    });
                }, 1000/fps);
            }(i));
        }

        // somehow fix the timing for actual lights within the cycle.
        // try solution above, research more

        if (isLoops) {
            if (!stopped) {
                console.log('!stopped2: ', stopped)
                setTimeout(function() {
                    startExperience(isLoops,lights_all,'');
                }, 1000/fps);
            }
        }
    }

    function stopExperience(){
        $.ajax({
            url: url_ip+url_allLights,
            type: 'PUT',
            data: '{"on":false}',
            success: function () {
            }
        });
        audioFile.pause();
    }


// -------------------- BUTTON FUNCTIONS -------------------- \\

    $(document).on('click', '.mode-button', function(){
        // Show controls

        $controls.show();


        // Get the selected mode
        var dataMode = $(this).attr('data-mode');
        // Assign mode to the controls
        $controls.attr('data-mode', dataMode);
        // Hide mode buttons
        $modeButtonWrapper.hide();
        $('body').attr('data-mode', dataMode);


            index = 0;

        var selectedMode = data.find(function(mode, i){
            if(mode.name === dataMode){
                index = i;
                return i;
            }
        });

        var selectedThumb = selectedMode.thumbnail,
            selectedName = selectedMode.name;

        $('section.header').addClass('single-view');
        $('section.header').css('background-image', 'url(' + selectedThumb + ')' );

        $('section.header h3').text(selectedName);

        console.log('selectedThumb', selectedThumb);

    });

    $('#startButton').on('click', function(){
        // Hide Start Button and show stop button
        $(this).hide();
        $("#stopButton").show();

        var dataMode = $("#controls").attr('data-mode'),
            index = 0;

        var selectedMode = data.find(function(mode, i){
            if(mode.name === dataMode){
                index = i;
                return i;
            }
        });

        var selectedModeIsLoops = selectedMode.loops,
            selectedModeAudio = selectedMode.audio;
        if (selectedMode.lights_all) {
            selectedModeColours = selectedMode.lights_all;
        }
        else {
            selectedModeColours = [selectedMode.light1,selectedMode.light2,selectedMode.light3,selectedMode.light4];
        }

        stopped = false;
        startExperience(selectedModeIsLoops, selectedModeColours, selectedModeAudio);

    });

    $('#stopButton').on('click', function(){
        console.log('clicked stop');
        $(this).hide();
        $("#startButton").show();
        stopped = true;
        stopExperience();
    });

    $("#backButton").on('click', function(){

        $controls.hide();
        $modeButtonWrapper.show();
        $('section.header').removeClass('single-view');
        $('section.header').css('background-image', 'none');
        $('section.header h3').text("Select Your Experience");
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
