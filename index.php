<?php include 'header.php'; ?>


    <body id="landing-page">

      <?php include 'nav.php'; ?>
      <?php include 'circles.php';?>

      <div class="container landing-page-container">
        
        <div class="landing-page-wrapper">

          <!-- <h1>Meditation Should Be Easy</h1> -->
          <h1>Already Reserved A Session?</h1>


          <div class="landing-button-wrapper">
            <button type="button" class="btn reservation-modal-button btn-info btn-lg soundOne" data-toggle="modal" data-target="#reservation-code-modal">Yes</button>
    
          
            <a href="modes.php" class="soundTwo"><button type="button" class="btn btn-info btn-lg " data-toggle="modal" data-target="#reservation-code-modal">Not Yet</button></a>
          </div>
      

        </div>

      </div>


<?php include 'partials/reservation-code-modal.php'; ?>


<?php include 'footer.php'; ?>


