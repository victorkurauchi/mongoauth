$(document).ready(function() {
  $(document.body).on('click', '.icons-list', function(e) {

    $(this).closest('tr').css('background-color', '#ddd');

    var userId = $(this).attr('data-id');
    $('#frmDelete').attr('action', '/api/user/' + userId);

  })
})