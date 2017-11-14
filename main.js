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
    const cycle_seawater = [[120,255,255,33300],[120,255,255,25500],[120,255,255,46920]]; // 3 seconds, green, blue

    const peach = [[30,59,84,62],[30,55,69,58],[30,70,100,60],[30,55,100,69]];
    // Sunset: ()
    const sunset_a = [[500,15,254,254],[500,30,129,63848],[500,50,166,52393]];
    const sunset_b = [[500,15,254,7107],[500,30,177,64107],[500,50,254,7608]];
    const sunset_a_bright = [[500,30,254,254],[500,100,129,63848],[500,255,166,52393]];
    const sunset_b_bright = [[500,30,254,7107],[500,100,177,64107],[500,255,254,7608]];

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
            "thumbnail": "img/mode-zero-preview.jpg",
            "description": "Hey, it was one night of wild passion! And yet you didn\'t notice her body? I like to look in the mirror. I just haven\'t had sex in a month. You know, you\'ve been here two months. It\'s hard to gauge time. She keeps saying that God is going to show me a sign. The\u2026 something of my ways. Teamocil.\r\n\r\nAre all the guys in here\u2026 you know? George Sr.: No, not all of them. Barry: Yeah. It\'s never the ones you hope. It feels good to be back in a queen! And with deep, deep concentration and, and great focus, he\'s often able to achieve an erect\u2013 Happy Franklin Friday. No, it\'s the opposite. It\'s like my heart is getting hard.\r\n\r\nYou stay on top of her, Buddy. Don\'t be afraid to ride her. Hard. YOU\'RE the Chiclet! Not me. Caw ca caw, caw ca caw, caw ca caw! But where did the lighter fluid come from? You\'re Killing Me, Buster. Got a big ass room at the travelodge. What a fun, sexy time for you."
        },
        {
            "name":"Sunset",
            "loops": false,
            "lights_all": [sunset_a,sunset_b_bright,sunset_a,sunset_b],
            "audio":"audio/HAVEN_Music1.mp3",
            "thumbnail": "img/mode-one-preview.jpg",
            "description":  "Hey, it was one night of wild passion! And yet you didn\'t notice her body? I like to look in the mirror. I just haven\'t had sex in a month. You know, you\'ve been here two months. It\'s hard to gauge time. She keeps saying that God is going to show me a sign. The\u2026 something of my ways. Teamocil.\r\n\r\nAre all the guys in here\u2026 you know? George Sr.: No, not all of them. Barry: Yeah. It\'s never the ones you hope. It feels good to be back in a queen! And with deep, deep concentration and, and great focus, he\'s often able to achieve an erect\u2013 Happy Franklin Friday. No, it\'s the opposite. It\'s like my heart is getting hard.\r\n\r\nYou stay on top of her, Buddy. Don\'t be afraid to ride her. Hard. YOU\'RE the Chiclet! Not me. Caw ca caw, caw ca caw, caw ca caw! But where did the lighter fluid come from? You\'re Killing Me, Buster. Got a big ass room at the travelodge. What a fun, sexy time for you.s"
        },
        {
            "name":"Waterfall",
            "loops":true,
            "lights_all":[cycle_seawater,cycle_seawater,cycle_seawater,cycle_seawater],
            "audio":"audio/HAVEN_Meditation2_GTFO.mp3",
            "thumbnail": "img/mode-four-preview.jpg",
            "description": "mode two test test test"
        },
        {
            "name":"Seawater",
            "loops":true,
            "lights_all":[cycle_seawater,cycle_seawater,peach,cycle_seawater],
            "audio":"audio/HAVEN_Meditation2_GTFO.mp3",
            "thumbnail": "img/mode-three-preview.jpg",
            "description": "mode three test test test"
        },
        {
            "name":"Daniels Idea of Waterfall Colours",
            "loops": true,
            "lights_all": [peach,peach,peach,peach],
            "audio":"audio/HAVEN_Meditation2_GTFO.mp3",
            "thumbnail": "img/mode-two-preview.jpg",
            "description": "mode four test test test"
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

        // $controls.show();

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

        var selectedName = selectedMode.name;

        // $('section.header').addClass('single-view');
        // $('section.header').css('background-image', 'url(' + selectedThumb + ')' );

        var selectedModeWrapper = $(".mode--single[data-mode='" + dataMode + "']");
        selectedModeWrapper.show();
        // singleModeWrapper.show();
        // singleModeWrapper.removeClass('.hidden-on-load');

        $('.index-header').addClass('single-view');


    });

    $(document).on('click', '.start-button', function(){
        // Hide Start Button and show stop button

        $(this).hide();
        $('.stop-button').show();
        $(this).closest('.mode--single').addClass('playing');

        var dataMode = $(this).attr('data-mode'),
            index = 0;
        console.log('dataMode: ', dataMode);

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

        console.log('selectedModeAudio: ', selectedModeAudio);

        stopped = false;
        startExperience(selectedModeIsLoops, selectedModeColours, selectedModeAudio);

    });

    $(document).on('click','.stop-button', function(){
        $(this).hide();
        $(".start-button").show();
        $('.mode--single').removeClass('playing');
        stopped = true;
        stopExperience();
    });

    $(document).on('click','.back-button', function(){

        $controls.hide();
        $modeButtonWrapper.show();
        $('.mode--single').hide();
        $('.mode--single').addClass('hidden-on-load');
        $('section.index-header').removeClass('single-view');
        $('body').attr('data-mode', '');

        // stopExperience();
    });


    //HANDLEBARS TEMPLATING SCRIPTS
    var $modeIndex = $("#placeholder")
    var $singleView = $("#secondPlaceholder");

// -------------------- HANDLEBAR JS -------------------- \\
    var handlebarsTemplate = $("#handlebars-template").html()
    var secondTemplate = $("#second-template").html()
    var templateCompile = Handlebars.compile(handlebarsTemplate)
    var secondTemplateCompile = Handlebars.compile(handlebarsTemplate)
    var secondTemplateCompile = Handlebars.compile(secondTemplate)
    var processedData = data;
    $modeIndex.html(templateCompile(processedData));
    $singleView.html(secondTemplateCompile(processedData));

});


$(window).load(function() {
      // Resize grid item images so they remain square
      var gridItemWidth = $('.grid-item--inner').width();
      $('.grid-item--inner').height(gridItemWidth);

});
