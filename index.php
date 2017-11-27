<?php include 'header.php'; ?>

<?php include 'nav.php'; ?>

    <body id="landing-page">
      
      <div class="container">
        
        <div class="col-sm-10 col-sm-offset-1">

          <header class="page-header">

          <h1>Already Reserved A Session?</h1>

         </header>

          <div class="col-sm-6 landing-col">
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#reservation-code-modal">Yes</button>
          </div>

          <div class="col-sm-6 landing-col">
            <a href="modes.php"><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#reservation-code-modal">Not Yet</button></a>
          </div>

        </div>

      </div>


<?php include 'partials/reservation-code-modal.php'; ?>


<?php include 'footer.php'; ?>


