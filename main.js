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
    var now;
    var started = false;
    var stopped;
    var brightness = 1.0;
    var goThroughLights;
    var checkIsTimeUp;
    const fps = 0.2; // frame rate for calling hue functions
    var bri, sat, hue;

    var audioFile;
    var audioFile_guided;


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

    const bright = [1000,254,121,8597];
    const bright_short = [500, 254,121,8597];

    // hues
    const h_bright = 8597;
    const h_orange = 5000;
    const h_red2 = 4386;
    const h_yellow = 7000;

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

    const sunset_a_backwards = [[500,254,166,52393], [500,200,129,63848],[500,150,180,h_orange]];
    const sunset_b_backwards = [[500,254,254,7608],[500,200,177,64107],[500,150,180,h_yellow]];
    const sunset_c_backwards = [[500,254,166,52393], [500,200,129,63848],[500,150,180,h_red2]];

    // Waterfall (linear)
    const waterfall_backwards_old = [bright,[1000,254,121,8597],light_blue,dark_blue,
                    light_blue,dark_blue,light_blue,light_blue,aqua,
                    dark_blue,light_blue,dark_blue,light_blue, bright];

    const waterfall_backwards = [dark_blue, light_blue, aqua];

    // Ocean Sunshine
    const oceansunshine_backwards = [[30,59,84,62],light_blue, bright_short, aqua];

    // Audio
    // var audio = new Audio('audio/HAVEN_Music1.mp3');

    // JSON of mode content

    data = [

        {
            // First Object is intentionally empty, don't remove
            "name":"modeZero",
            "loops":false,
            "duration":180000,
            "transition_time":3,
            "audio":"audio/mode-zero.mp3",
            "audio_guided":"",
            "thumbnail": "img/mode-zero-preview.jpg",
            "description": "Hey, it was one night of wild passion! And yet you didn\'t notice her body? I like to look in the mirror. I just haven\'t had sex in a month. You know, you\'ve been here two months. It\'s hard to gauge time. She keeps saying that God is going to show me a sign. The\u2026 something of my ways. Teamocil.\r\n\r\nAre all the guys in here\u2026 you know? George Sr.: No, not all of them. Barry: Yeah. It\'s never the ones you hope. It feels good to be back in a queen! And with deep, deep concentration and, and great focus, he\'s often able to achieve an erect\u2013 Happy Franklin Friday. No, it\'s the opposite. It\'s like my heart is getting hard.\r\n\r\nYou stay on top of her, Buddy. Don\'t be afraid to ride her. Hard. YOU\'RE the Chiclet! Not me. Caw ca caw, caw ca caw, caw ca caw! But where did the lighter fluid come from? You\'re Killing Me, Buster. Got a big ass room at the travelodge. What a fun, sexy time for you."
        },
        {
            "name":"focus",
            "title": "Focus",
            "loops": false,
            "duration":210000,
            "bulb1": [room_bright, 12000],
            "bulb2": [room_bright, 1000],
            "bulb3": [room_bright, 12000],
            "bulb4": [room_bright, 12000],
            //"transition_time":3,
            "audio":"",
            "audio_guided":"",
            "thumbnail": "img/mode-one-preview.jpg",
            "description":  "Slow transition into white lights."
        },
        {
            "name": "islamic-prayer",
            "title":"Islamic Prayer",
            "loops": false,
            "duration":180000,
            "bulb1": [sunset_a_backwards, 5000],
            "bulb2": [sunset_b_backwards, 5000],
            "bulb3": [sunset_c_backwards, 5000],
            "bulb4": [sunset_b_backwards, 5000],
            //"transition_time":3,
            "audio":"audio/islamic-mode.mp3",
            "audio_guided":"",
            "thumbnail": "img/islamic-prayer-orig.jpg",
            "description":  "Call to Adhan prayer, followed by silence, with sunrise lighting (pink, orange, peach hues) to brightness."
        },
        {
            "name":"waterfall",
            "title": "Waterfall Breathing",
            "time": "5 minutes",
            "loops": true,
            "duration":285000, // 5 min
            "bulb1": [waterfall_backwards, 3000],
            "bulb2": [waterfall_backwards, 4000],
            "bulb3": [waterfall_backwards, 5000],
            "bulb4": [waterfall_backwards, 3000],
            //"transition_time":3,
            "audio":"audio/waterfall_vui_3min/HAVEN_Sprint10_MusicOnly.mp3", // 3:30
            "audio_guided":"audio/waterfall_vui_3min/HAVEN_Sprint10_VoiceOnly.mp3",
            // "audio":"audio/waterfall/HAVEN_Music_Only.mp3",
            // "audio_guided":"audio/waterfall/HAVEN_Voice_Only.mp3",
            "thumbnail": "img/water.jpg",
            "description": "Waterfall sounds and blue lights, with guided breathing."
        },
        {
            "name":"beach-body-scan",
            "title": "Ocean Body Scan",
            "time": "7 minutes",
            "loops": true,
            "duration":420000,
            "bulb1": [oceansunshine_backward, 3000],
            "bulb2": [oceansunshine_backward, 4000],
            "bulb3": [oceansunshine_backward, 5000],
            "bulb4": [oceansunshine_backward, 3000],
            "audio":"audio/waterfall_vui_3min/HAVEN_Sprint10_MusicOnly.mp3", // 3:30
            "audio_guided":"audio/waterfall_vui_3min/HAVEN_Sprint10_VoiceOnly.mp3",
            // "audio":"audio/waterfall/HAVEN_Music_Only.mp3",
            // "audio_guided":"audio/waterfall/HAVEN_Voice_Only.mp3",
            "thumbnail": "img/water.jpg",
            "description": "Waterfall sounds and blue lights, with guided breathing."
        }

        // {
        //     "name":"Debug",
        //     "loops": true,
        //     "duration":180000,
        //     "bulb1": [peach, 3000],
        //     "bulb2": [waterfall_backwards, 3000],
        //     "bulb3": [waterfall_backwards, 6000],
        //     "bulb4": [room_bright, 3000],
        //     //"transition_time":3,
        //     "audio":"audio/HAVEN_Meditation2_GTFO.mp3",
        //     "audio_guided":"",
        //     "thumbnail": "img/mode-two-preview.jpg",
        //     "description": "mode four test test test"
        // }
    ]


// -------------------- HELPER FUNCTIONS -------------------- \\

    function changeAvailability(text) {

        if (text) {
            // document.getElementById('availability').innerHTML = text;
        }

        else { // no arguments passed
            // if available: change to room in use
            // if room in use: change to available
            if (document.getElementById('availability').innerHTML == "Room Available") {
                document.getElementById('availability').innerHTML = "Room in Use";
                document.getElementById('availability').style = "color: red;";
            }
            else {
                document.getElementById('availability').innerHTML = "Room Available";
                document.getElementById('availability').style = "color: green;";
            }
        }
    }

    function alertStartExperience() {
        // swal({
        //   title: "Please enter the room and make yourself comfortable.",
        //   text: "Your experience will begin shortly. The room code is 1050.",
        //   button: "Enter"
        // });
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

    function createTimedColourArray(isLoops, colours, transitiontime, totaltime) {

        if (isLoops) {
            var tt = transitiontime+1000; // account for javascript delays
            var totaltime_colours = colours.length * tt; // -10000 for the end transition to light
            console.log ('repeats: ', totaltime, '/', totaltime_colours);
            var repeats = Math.floor(totaltime/totaltime_colours);

            // set up array
            var timed_colours = [bright, bright];

            // add time-specific number of colours to timed_colours array
            for (var i=0; i<repeats; i++) {
                Array.prototype.push.apply(timed_colours, colours);
            }

            // do something for sunset (if it's just a linear transition)

            console.log('timed colours made', timed_colours);
            return timed_colours;
        }

        else {
            return colours;
        }
    }

// -------------------- LIGHT LOOPS -------------------- \\

    function wakeUpLights() {

        clearTimeout(goThroughLights);
        // turns all lights back to normal classroom setting
        changeLightColour(1, bright); //[1000,254,121,8597]
        changeLightColour(2, bright); //[1000,254,121,8597]
        changeLightColour(3, bright); //[1000,254,121,8597]
        changeLightColour(4, bright); //[1000,254,121,8597]

    }

    function turnOffAllLights() {
        $.ajax({
            url: url_ip+url_allLights,
            type: 'PUT',
            data: '{"on":false}',
            success: function () {
            }
        });
    }

    function changeLightColour(bulb,colour) {
        $.ajax({
            url: url_ip+'/lights/'+bulb+'/state',
            type: 'PUT',
            data: convertColourArrayToAjax(colour),
            success: function() {
            }
        });
    }

    function updateTimedColours(bulb,colours,transitiontime) {
        // transitiontime in miliseconds (tt = 3000 = 3 seconds)

        (function theLoop (i) {

            // conditionally check to see whether to start it again
            if (stopped) { // if it's stopped
                clearTimeout(goThroughLights);
            } else {
                goThroughLights = setTimeout(function () {
                    console.log('bulb', bulb, ', iteration - ', i); // goes from colours.length-1 to 0
                    console.log("current colour hue", colours[i][3]);

                    changeLightColour(bulb, colours[i]);

                    if (--i) {          // If i > 0, keep going
                        theLoop(i);       // Call the loop again, and pass it the current value of i
                    }
                }, transitiontime);
            };
        })(colours.length-1);
    }

    function startExperience(isLoops,bulbs,transition_time,audio,audio_guided,total_time){
        started = true;
        stopped = false;

        changeAvailability('Room in Use');

        //changeAvailability("Room in Use");
        alertStartExperience();

        // get and play audio
        // TODO setTimeout here

        setTimeout(function() {
            if (audio) {
                audioFile = new Audio(audio);
                fetchAudioAndPlay(audioFile);
            }
            if (audio_guided) {
                audioFile_guided = new Audio(audio_guided);
                fetchAudioAndPlay(audioFile_guided);
            }
        }, 12000);
        // if (audio) {
        //     audioFile = new Audio(audio);
        //     fetchAudioAndPlay(audioFile);
        // }
        // if (audio_guided) {
        //     audioFile_guided = new Audio(audio_guided);
        //     fetchAudioAndPlay(audioFile_guided);
        // }

        // immediately start initial colours
        changeLightColour(1, bulbs[0][bulbs[0].length-1]);
        changeLightColour(2, bulbs[1][bulbs[1].length-1]);
        changeLightColour(3, bulbs[2][bulbs[2].length-1]);
        changeLightColour(4, bulbs[3][bulbs[3].length-1]);

        // update light colours for specific transitiontime
        updateTimedColours(1, bulbs[0], transition_time[0]);
        updateTimedColours(2, bulbs[1], transition_time[1]);
        updateTimedColours(3, bulbs[2], transition_time[2]);
        updateTimedColours(4, bulbs[3], transition_time[3]);

        now = Date.now(); // in miliseconds
        console.log('now', now);
        // when it reaches time-30 seconds or something
        // stop interval and wakeUpLights

        // constantly check if "now" has reached time-30 seconds
        checkIsTimeUp = setInterval(function() {
            console.log('checking if time is up');
            console.log('time passed ', Date.now() - now);
            console.log('time', total_time-30000);
            if (Date.now() - now > (total_time-30000)) { // if it reaches time-30 seconds
                console.log('TIME IS UP');
                wakeUpLights();
                clearInterval(checkIsTimeUp);
            }
        }, 5000); // check every 5 seconds?
    }

    function stopExperience(){
        started = false;
        stopped = true;

        changeAvailability('Room Available');
        //changeAvailability("Room Available");
        clearTimeout(goThroughLights);
        clearTimeout(checkIsTimeUp);

        turnOffAllLights();

        // execute again after last Timeout execution
        setTimeout(function() {
            console.log('second turn off all lights');
            if (stopped) { // make sure experience didn't start again
                turnOffAllLights();
            }
        },4000);

        // setTimeout(function() {
        //     console.log('turning off all lights');
        //     $.ajax({
        //         url: url_ip+url_allLights,
        //         type: 'PUT',
        //         data: '{"on":false}',
        //         success: function () {
        //         }
        //     });
        // }, 3000);
        // // TODO 5000 is just a placeholder large number, can be transitiontime + 1000 or something.
        //
        audioFile.pause();
        if (audioFile_guided) {
            audioFile_guided.pause();
        }
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

        // $(this).hide();
        // $('.stop-button').show();
        // if (selectedModeAudioGuided) {
        //     $('.guided-input').show();
        // }
        // $('.welcome-text').show();
        // $(this).closest('.mode--single').addClass('playing');

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
            selectedModeAudio = selectedMode.audio,
            selectedModeAudioGuided = selectedMode.audio_guided,
            selectedModeDuration = selectedMode.duration,
            selectedModeColours = [selectedMode.bulb1[0],selectedMode.bulb2[0],selectedMode.bulb3[0],selectedMode.bulb4[0]],
            selectedModeTime = [selectedMode.bulb1[1],selectedMode.bulb2[1],selectedMode.bulb3[1],selectedMode.bulb4[1]],
            selectedModeColours = [
                createTimedColourArray(selectedModeIsLoops,selectedMode.bulb1[0],selectedMode.bulb1[1],selectedModeDuration),
                createTimedColourArray(selectedModeIsLoops,selectedMode.bulb2[0],selectedMode.bulb2[1],selectedModeDuration),
                createTimedColourArray(selectedModeIsLoops,selectedMode.bulb3[0],selectedMode.bulb3[1],selectedModeDuration),
                createTimedColourArray(selectedModeIsLoops,selectedMode.bulb4[0],selectedMode.bulb4[1],selectedModeDuration)
            ];

        stopped = false;

        // buttons
        $(this).hide();
        $('.stop-button').show();
        $('.welcome-text').show();
        if (selectedModeAudioGuided) {
            $('.turn-off-guided-button').show();
        }
        //$(this).closest('.mode--single').addClass('playing');
        $('.single-mode--wrapper').addClass('playing');

        startExperience(selectedModeIsLoops, selectedModeColours, selectedModeTime, selectedModeAudio, selectedModeAudioGuided, selectedModeDuration);


        // if (selectedModeAudioGuided) {
        //     $('.guided-input').show();

        //     $('#mode-button-wrapper').addClass('offers-guided');

        //     $('.guided-button').click(function(){
        //         audioFile_guided.volume = 1;
        //     });
        //     $('.nonguided-button').click(function(){
        //         audioFile_guided.volume = 0;
        //     });

            $('.turn-off-guided-button').click(function(){
                audioFile_guided.volume = 0;
                $(this).hide();
                $('.turn-on-guided-button').show();

            });

            $('.turn-on-guided-button').click(function(){
                audioFile_guided.volume = 1;
                $(this).hide();
                $('.turn-off-guided-button').show();
            });

        //     $('.guided-input').click(function(){
        //         // buttons
        //         $('.start-button').hide();
        //         $('.stop-button').show();
        //         $('.welcome-text').show();
        //         //$('.welcome-text').style.opacity = 1.0;
        //         $('.start-button').closest('.single-mode--wrapper').addClass('playing');

        //         if (!started) {
        //             console.log('starting here');
        //             startExperience(selectedModeIsLoops, selectedModeColours, selectedModeTime, selectedModeAudio, selectedModeAudioGuided, selectedModeDuration);
        //         }
        //     });
        // }
        // else {
        //     // buttons
        //     $(this).hide();
        //     $('.stop-button').show();
        //     $('.welcome-text').show();
        //     $(this).closest('.mode--single').addClass('playing');
        //     $('.single-mode--wrapper').addClass('playing');

        //     startExperience(selectedModeIsLoops, selectedModeColours, selectedModeTime, selectedModeAudio, selectedModeAudioGuided, selectedModeDuration);

        // }

        // $('.guided-button').click(function(){
        //     audioFile_guided.volume = 1;
        // });
        // $('.nonguided-button').click(function(){
        //     audioFile_guided.volume = 0;
        // });

    });

    $(document).on('click','.stop-button', function(){
        $(this).hide();
        $('.guided-input').hide();
        $('.welcome-text').hide();
        $(".start-button").show();
        $(".selected-experience-wrapper").show();
        $(".room-in-use-wrapper").hide();
        $(".turn-off-guided-button").hide();
        $('.single-mode--wrapper').removeClass('playing');
        stopExperience();
    });

    $(document).on('click','.back-button', function(){

        $controls.hide();
        $modeButtonWrapper.show();
        $('.mode--single').hide();
        $('.mode--single').addClass('hidden-on-load');
        $('section.index-header').removeClass('single-view');
        $('body').attr('data-mode', '');

        //stopExperience();
    });

    $(document).on('click','#changeAvailability', function(){
        changeAvailability();
    })

    // $(document).on('click','.nonguided-button', function(){
    //     console.log('nonguided click');
    //     audioFile_guided.volume = 0;
    // });
    // $(document).on('click','.guided-button', function(){
    //     console.log('guided button click');
    //     audioFile_guided.volume = 1;
    // });



});
