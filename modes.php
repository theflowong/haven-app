<?php include 'header.php'; ?>

<?php include 'nav.php'; ?>

<div id="page--modes">

  <section class="row mode-list-page--header">
    <div class="container">
    <h3>Select Your Experience</h3>
    </div>
  </section>

  <section id="section--mode-index" class="row">
    <div class="container">
      
        <!-- TARGET FOR HANDLEBARS TO INJECT MARKUP -->
        <div id="placeholder" class="mode-list"></div>
     
    </div>
  </section>

  <section class="debug">
      <button id="changeAvailability" style="bottom:0; position:absolute;">Change Availability</button>
  </section>



 


      <!-- TEMPLATE FOR MODE INDEX -->
      <script type="text/handlebars-template" id="handlebars-template">
        {{#each this}}
         {{#if @first}}
         {{else}}
          
            <a href="single-mode.php#{{name}}" class="mode-button" id="{{name}}" data-mode="{{name}}">
            <div class="grid-item--inner" style="background-image: url({{thumbnail}})">
              <h3 class="mode-name">{{title}}</h3>
            </div>
            </a>
          
          {{/if}}
        {{/each}}
      </script>


    


      <script type="text/javascript">
        $(document).ready(function(){
               //HANDLEBARS TEMPLATING SCRIPTS
    var $modeIndex = $("#placeholder")

// -------------------- HANDLEBAR JS -------------------- \\
    var handlebarsTemplate = $("#handlebars-template").html()
    var templateCompile = Handlebars.compile(handlebarsTemplate)
    var secondTemplateCompile = Handlebars.compile(handlebarsTemplate)
    var processedData = data;
    $modeIndex.html(templateCompile(processedData));

    
    $(".mode-button").click(function() {
    $(this).css("z-index","1000"); 
    $('.mode-name').hide(); 
    // $(this).fadeOut(2000);
    $(this).css({
      "transform":"scale(10)",
      "-webkit-filter" : "blur(5px)",
      "-moz-filter" : "blur(5px)",
      "-o-filter" : "blur(5px)",
      "-ms-filter" : "blur(5px)",
      "filter" : "blur(5px)"
       });

    // $(this).css("transform","scale(10)");
     // Added px to make it work, 
                                         //   or get rid of quotes -500
        var href = $(this).attr('href');

             // Delay setting the location for one second
        setTimeout(function() {window.location = href}, 1000);
        return false;
    });


        })


        $(window).load(function() {
          $('.grid-item--inner').css({
            'opacity': '1',
            'margin-top' : '-10px'
            })
        });
      </script>


</div>
<?php include 'footer.php'; ?>
