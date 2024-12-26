$(document).ready(function(){
    var timer;

    var exitModalParams = {
        numberToShown: 1,
        callbackOnModalShow: function() {
            var counter = $('.exit-modal').data('exitModal').showCounter;
            $('.exit-modal .modal-body p').text("Exit modal shown " + counter + " times. Are you sure you want to leave?");
        },
        callbackOnModalShown: function() {
            timer = setTimeout(function(){
                window.location.href = "http://www.jqueryscript.net";
            }, 4000);
        },
        callbackOnModalHide: function() {
            clearTimeout(timer);
        }
    };

    // Initialize the exit modal
    $('.exit-modal').exitModal(exitModalParams);

    // Add event listener for the close button
    $('.close-exit-modal').on('click', function() {
        $('.exit-modal').modal('hide');
    });
});