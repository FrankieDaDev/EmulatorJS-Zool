$(document).ready(function(){
    var timer;

    // Initialize the exit modal
    $('.exit-modal').on('show.bs.modal', function (e) {
        var counter = $('.exit-modal').data('showCounter') || 0;
        counter++;
        $('.exit-modal').data('showCounter', counter);
        $('.exit-modal .modal-body p').text("Exit modal shown " + counter + " times. Are you sure you want to leave?");
    });

    $('.exit-modal').on('shown.bs.modal', function (e) {
        timer = setTimeout(function(){
            window.location.href = "http://www.jqueryscript.net";
        }, 4000);
    });

    $('.exit-modal').on('hide.bs.modal', function (e) {
        clearTimeout(timer);
    });

    // Add event listener for the close button
    $('.close-exit-modal').on('click', function () {
        $('.exit-modal').modal('hide');
    });

    // Show the modal when the user tries to leave the page
    $(window).on('beforeunload', function(e) {
        $('.exit-modal').modal('show');
        e.preventDefault();
        e.returnValue = '';
    });
});
