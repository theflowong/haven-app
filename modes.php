<?php include 'header.php'; ?>

<?php include 'nav.php'; ?>


        <div class="circle">

        </div>

        <style type="text/css">
          .circle{
            position: absolute;
            top: 300px;
            left: -150px;
            background-color: blue;
            width: 300px;
            height: 300px;
            border-radius: 50%;
          }
        </style>


        <section class="row index-header">
          <div class="container">
          <h1>Welcome To Haven</h1>
          <h3>Select Your Experience To Get Started</h3>
          </div>
        </section>

        <section id="section--mode-index" class="row">
          <div class="container">
            <div id="mode-button-wrapper">
              <!-- TARGET FOR HANDLEBARS TO INJECT MARKUP -->
              <div id="placeholder"></div>
            </div>
          </div>
        </section>

        <section class="debug">
            <button id="changeAvailability" style="bottom:0; position:absolute;">Change Availability</button>
        </section>



      <!-- TARGET FOR HANDLEBARS TO INJECT MARKUP -->
      <div id="secondPlaceholder"></div>


      <!-- TEMPLATE FOR MODE INDEX -->
      <script type="text/handlebars-template" id="handlebars-template">
        {{#each this}}
         {{#if @first}}
         {{else}}
          <div class="col-sm-3 grid-item">
            <a href="#" class="mode-button" id="{{name}}" data-mode="{{name}}">
            <div class="grid-item--inner" style="background-image: url({{thumbnail}})">
              <h3 class="mode-name">{{name}}</h3>
            </div>
            </a>
          </div>
          {{/if}}
        {{/each}}
      </script>


      <!-- TEMPLATE FOR SINGLE VIEW -->
      <script type="text/handlebars-template" id="second-template">
          {{#each this}}
          {{#if @first}}
         {{else}}

          <section class="mode--single hidden-on-load" data-mode="{{name}}" >
          <header class="row" style="background-image: url('{{thumbnail}}')">
                <h1 id="availability"></h1>
              <h1 class="mode-name">{{name}}</h1>
              <p class="mode-subtitle">{{time}}</p>

              <button class="start-experience start-button haven-button salmon" data-mode="{{name}}">Start</button>
              <section class="guided-input" style="display: none;">
                <button class="choice-button guided-button haven-button">Guided Breathing</button>
                <button class="choice-button nonguided-button haven-button">Non-Guided Breathing</button>
              </section>
              <div class="container welcome-text" style="display: none;">
                <div class="col-6 col-md-auto">
                    <br/>
                    <p>Your experience has now started.<br/>Please enter the room and make yourself comfortable.</p>
                    <br/>
                </div>
              </div>
              <button class="stop-button haven-button salmon" style="display: none;">Stop</button>
              <button class="back-button">Back</button>

          </header>


          <div class="mode--single-body">
            <div class="container">
              <div class="col-sm-10 col-sm-offset-1">
                <h3 class="description-heading">What To Expect</h3>
                <p>{{description}}</p>
              </div>
            </div>
          </div>

          </section>

          {{/if}}
        {{/each}}

      </script>


      <script type="text/javascript">
        $(document).ready(function(){
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


        })
      </script>


<?php include 'footer.php'; ?>
