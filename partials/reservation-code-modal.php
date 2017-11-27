
<!-- Modal -->
<div id="reservation-code-modal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Please Input Your Reservation Code</h4>

      </div>
      <div class="modal-body">
        <form id="code-input-form" autocomplete="false">
          <input id="code-input" type="text" maxlength="4" placeholder="Code"/>
        </form>
        <p>This can be found in your confirmation email</p>

      </div>
      <div class="modal-footer">

        <a id="linkToSingleMode" href="" style="display: none;"><button type="submit" class="btn btn-default">Go</button></a>

      </div>
    </div>

  </div>
</div>

<script type="text/javascript">
  $(document).ready(function(){

    $( "#code-input" ).keyup(function() {

      var codeInput = $(this).val(),
          linkToSingleMode = $('#linkToSingleMode');
      var selectedMode;


      if (codeInput == 1111){
        selectedMode = "Waterfall";
        modeLink = "single-mode.php#waterfall";
        linkToSingleMode.attr('href', modeLink);
        linkToSingleMode.fadeIn();

      }

      else if (codeInput == 2222){
        selectedMode = "Islamic Prayer";
        modeLink = "single-mode.php#islamic-prayer";
        linkToSingleMode.attr('href', modeLink);
        linkToSingleMode.fadeIn();

      }

      else if (codeInput == 3333){
        selectedMode = "Focus";
        modeLink = "single-mode.php#focus";
        linkToSingleMode.attr('href', modeLink);
        linkToSingleMode.fadeIn();

      }


      console.log(selectedMode);
     

    });

  })
</script>