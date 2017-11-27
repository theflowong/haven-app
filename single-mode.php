<?php include 'header.php';?>

<div id="page--single-mode">
<?php include 'nav.php';?>
<?php include 'start-experience-modal.php';?>


<script type="text/javascript">
  $(document).ready(function(){

      var dataMode = window.location.hash.substring(1);
      $('body').attr('data-mode', dataMode);
    
      // index = 0;
      //Match mode in URL to corresponding object in data.json
      var selectedMode = data.find(function(mode, i){
          if(mode.name == dataMode){
              index = i;
              return i;
          }
      });
      //Set variables for values in data.json
      var selectedName = selectedMode.name,
            thumbnail = selectedMode.thumbnail,
            title = selectedMode.title;
            $('.single-mode--wrapper').css('background-image', 'url(' + thumbnail + ')');
            $('.mode-title').text(title);
            $('.start-button').attr('data-mode', dataMode)
      
      })
</script>

      <section class="row single-mode--wrapper">
          <div class="single-mode--inner">
          
          <div class="selected-experience-wrapper">
          <h4 class="selected-heading">Your Selected Experience</h4>
          <h3 class="mode-title"></h3>
          </div>
          
          <!-- <h3 id="availability"></h3> -->
          <div class="room-in-use-wrapper">
            <h3 class="in-use">Haven Is Currently In Use</h3></div>

          <div class="starting-soon-wrapper">
            <h3>Your Experience Will Start Shortly</h3>
            <h4>The door code is 1050#</h4>
          </div>

          <div id="mode-button-wrapper">
          <button class="start-button haven-cta" data-mode   data-target="#start-experience-modal">Start</button>
          <a id="change-modes-link" href="modes.php">Change Mode</a>
          <button class="stop-button haven-button" style="display: none;">Stop</button>
              <section class="guided-input" style="display: none;">
                <button class="choice-button guided-button haven-button">Guided Breathing</button>
                <button class="choice-button nonguided-button haven-button">Non-Guided Breathing</button>
              </section>
              <!-- TARGET FOR HANDLEBARS TO INJECT MARKUP -->
              <div id="placeholder"></div>
            </div>
         </div>
        </section>

<!--         <section id="single-mode--body" class="row">
          <div class="container">

          </div>
        </section> -->

        <section class="debug">
            <button id="changeAvailability" style="bottom:0; position:absolute;">Change Availability</button>
        </section>



</div>

<script type="text/javascript">
  $(document).ready(function(){

    function showInUse(){
      $('.room-in-use-wrapper').show();
      $('.starting-soon-wrapper').hide();
      $('.selected-experience-wrapper').hide();
    }

    $('.start-button').click(function(){
        setTimeout(showInUse, 3000);
    });

  })

</script>



<?php include 'footer.php'; ?>