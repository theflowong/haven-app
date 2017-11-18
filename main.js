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
    var goThroughLights;
    const fps = 0.2; // frame rate for calling hue functions
    var bri, sat, hue;


// -------------------- DATA -------------------- \\

    // Colours (one colour = one array): [transition time, bri, sat, hue]
    const colour_pink = [30,255,255,56100]; // 3 seconds, pink

    const dark_blue = [30,255,255,46920]; // 12 seconds
    const teal_blue = [30,255,255,33300];
    const light_blue = [30,255,255,38300];
    const light_blue1 = [30,169,254,41427];
    const light_blue2 = [30,169,254,39189];
    const light_blue3 = [30,169,254,41427]
    const aqua = [120,255,255,33300];
    const green = [120,255,255,25500];

    const bright = [30,254,121,8597];

    // hues
    const h_bright = 8597;

    // finish light: bright white lights to transition back into real world
    const colour_finish = [30,255,255,56100]; // 3 seconds, pink;

    // Colour Cycles (one cycle = one array of colours): [[time,bri,sat,hue], [time,bri,sat,hue]]
    const room_bright = ['',bright];

    const cycle_seawater = [light_blue,dark_blue]; // 3 seconds
    const peach = [[30,59,84,62],[30,55,69,58],[30,70,100,60],[30,55,100,69]];


    const orange = [120,255,255,4000];

    // Sunset (linear)
    const sunset_a = [[500,15,254,254],[500,30,129,63848],[500,50,166,52393]];
    const sunset_b = [[500,15,254,7107],[500,30,177,64107],[500,50,254,7608]];
    const sunset_a_bright = [[500,30,254,254],[500,100,129,63848],[500,255,166,52393]];
    const sunset_b_bright = [[500,30,254,7107],[500,100,177,64107],[500,255,254,7608]];

    const sunset_a_backwards = [bright, bright, [500,254,166,52393], [500,150,129,63848],[500,100,254,254]];
    const sunset_b_backwards = [bright, bright, [500,254,254,7608],[500,150,177,64107],[500,100,254,7107]];

    // Waterfall (linear)
    const waterfall_backwards = [bright,[1000,254,121,8597],light_blue,dark_blue,
                    light_blue,dark_blue,light_blue,light_blue,aqua,
                    dark_blue,light_blue,dark_blue,light_blue, bright];
                    // 3 minutes of blueness, 30 sec transitioning into bright




    // Audio
    // var audio = new Audio('audio/HAVEN_Music1.mp3');

    // JSON of mode content

    var data = [

        {
            // First Object is intentionally empty, don't remove
            "name":"modeZero",
            "loops":false,
            "lights_all": [cycle_seawater,cycle_seawater,cycle_seawater,cycle_seawater],
            "transition_time":3,
            "audio":"audio/mode-zero.mp3",
            "thumbnail": "img/mode-zero-preview.jpg",
            "description": "Hey, it was one night of wild passion! And yet you didn\'t notice her body? I like to look in the mirror. I just haven\'t had sex in a month. You know, you\'ve been here two months. It\'s hard to gauge time. She keeps saying that God is going to show me a sign. The\u2026 something of my ways. Teamocil.\r\n\r\nAre all the guys in here\u2026 you know? George Sr.: No, not all of them. Barry: Yeah. It\'s never the ones you hope. It feels good to be back in a queen! And with deep, deep concentration and, and great focus, he\'s often able to achieve an erect\u2013 Happy Franklin Friday. No, it\'s the opposite. It\'s like my heart is getting hard.\r\n\r\nYou stay on top of her, Buddy. Don\'t be afraid to ride her. Hard. YOU\'RE the Chiclet! Not me. Caw ca caw, caw ca caw, caw ca caw! But where did the lighter fluid come from? You\'re Killing Me, Buster. Got a big ass room at the travelodge. What a fun, sexy time for you."
        },
        {
            "name":"Focus",
            "loops": false,
            //"lights_all": [room_bright, room_bright, room_bright, room_bright],
            "bulb1": [room_bright, 12000],
            "bulb2": [room_bright, 12000],
            "bulb3": [room_bright, 12000],
            "bulb4": [room_bright, 12000],
            //"transition_time":3,
            "audio":"",
            "thumbnail": "img/mode-one-preview.jpg",
            "description":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            "name":"Islamic Prayer",
            "loops": false,
            //"lights_all": [sunset_a_backwards,sunset_b_backwards,sunset_a_backwards,sunset_b_backwards],
            "bulb1": [sunset_a_backwards, 12000],
            "bulb2": [sunset_b_backwards, 12000],
            "bulb3": [sunset_a_backwards, 12000],
            "bulb4": [sunset_b_backwards, 12000],
            //"transition_time":3,
            "audio":"audio/HAVEN_Adhan_Music.mp3",
            "thumbnail": "img/mode-one-preview.jpg",
            "description":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            "name":"Waterfall",
            "loops": false,
            //"lights_all":[waterfall_backwards, waterfall_backwards, waterfall_backwards, waterfall_backwards],
            "bulb1": [waterfall_backwards, 3000],
            "bulb2": [waterfall_backwards, 4000],
            "bulb3": [waterfall_backwards, 5000],
            "bulb4": [waterfall_backwards, 3000],
            //"transition_time":3,
            "audio":"audio/HAVEN_Meditation2_GTFO.mp3", // 3:30
            "thumbnail": "img/mode-three-preview.jpg",
            "description": "mode three test test test"
        },
        {
            "name":"Debug",
            "loops": true,
            "bulb1": [peach, 3000],
            "bulb2": [waterfall_backwards, 3000],
            "bulb3": [waterfall_backwards, 6000],
            "bulb4": [room_bright, 3000],
            //"transition_time":3,
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

    function fetchAudioAndPlay(audioFile) {
        // fetch(audioFile);
        return audioFile.play();
    }

// -------------------- LIGHT LOOPS -------------------- \\

    function changeLightColour(bulb,colours,transitiontime) {
        // transitiontime in miliseconds (tt = 3000 = 3 seconds)
        (function theLoop (i) {
            goThroughLights = setTimeout(function () {
                console.log("iteration - ", i)
                console.log("current colour", colours[i]);
                $.ajax({
                    url: url_ip+'/lights/'+bulb+'/state',
                    type: 'PUT',
                    data: convertColourArrayToAjax(colours[i]),
                    success: function() {
                    }
                });

                if (--i) {          // If i > 0, keep going
                    theLoop(i);       // Call the loop again, and pass it the current value of i
                }
            }, transitiontime);
        })(colours.length-1);
    }

    function startExperience(isLoops,bulbs,time,audio){
        // alert(selected.light);
        if (audio) {
            audioFile = new Audio(audio);
            fetchAudioAndPlay(audioFile);
        }

        changeLightColour(1, bulbs[0], time[0]);
        changeLightColour(2, bulbs[1], time[1]);
        changeLightColour(3, bulbs[2], time[2]);
        changeLightColour(4, bulbs[3], time[3]);

        //
        // // assuming all lights have the same number of transitions
        // (function theLoop (i) {
        //     goThroughLights = setTimeout(function () {
        //         console.log("iteration - ", i)
        //         console.log("current colour", bulbs[0][i]);
        //         $.ajax({
        //             url: url_ip+'/lights/1/state',
        //             type: 'PUT',
        //             data: convertColourArrayToAjax(bulbs[0][i]),
        //             success: function() {
        //             }
        //         });
        //         $.ajax({
        //             url: url_ip+'/lights/2/state',
        //             type: 'PUT',
        //             data: convertColourArrayToAjax(bulbs[1][i]),
        //             success: function() {
        //             }
        //         });
        //
        //         if (--i) {          // If i > 0, keep going
        //             theLoop(i);       // Call the loop again, and pass it the current value of i
        //         }
        //     }, 3*1000);
        // })(bulbs[0].length-1);
        //
        // (function theLoop (i) {
        //     goThroughLights = setTimeout(function () {
        //         console.log("SECOND THELOOP. iteration - ", i)
        //         console.log("SECOND THELOOP. current colour", bulbs[0][i]);
        //         $.ajax({
        //             url: url_ip+'/lights/3/state',
        //             type: 'PUT',
        //             data: convertColourArrayToAjax(bulbs[2][i]),
        //             success: function() {
        //             }
        //         });
        //         $.ajax({
        //             url: url_ip+'/lights/4/state',
        //             type: 'PUT',
        //             data: convertColourArrayToAjax(bulbs[3][i]),
        //             success: function() {
        //             }
        //         });
        //
        //         if (--i) {          // If i > 0, keep going
        //             theLoop(i);       // Call the loop again, and pass it the current value of i
        //         }
        //     }, 3*1000);
        // })(bulbs[0].length-1);






        // go through this function again
        // maybe delete if we're not looping...
        if (isLoops) {
            if (!stopped) {
                setTimeout(function() {
                    startExperience(isLoops,bulbs,'');
                }, 1000/fps);
            }
        }
    }

    function stopExperience(){
        clearTimeout(goThroughLights);
        console.log('stop experience, moving on');
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
            selectedModeColours = [selectedMode.bulb1[0],selectedMode.bulb2[0],selectedMode.bulb3[0],selectedMode.bulb4[0]];
        }
            selectedModeTime = [selectedMode.bulb1[1],selectedMode.bulb2[1],selectedMode.bulb3[1],selectedMode.bulb4[1]];

        console.log('selectedModeAudio: ', selectedModeAudio);

        stopped = false;
        startExperience(selectedModeIsLoops, selectedModeColours, selectedModeTime, selectedModeAudio);

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
