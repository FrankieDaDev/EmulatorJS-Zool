$(document).ready(function(){
    var timer;

    // Initialize the exit modal
    $('.exit-modal').on('show.bs.modal', function (e) {
        var counter = $('.exit-modal').data('showCounter') || 0;
        counter++;
        $('.exit-modal').data('showCounter', counter);
        $('.exit-modal .modal-body p').text("Exit modal shown " + counter + " times. Are you sure you want to leave? Please enter your information:");
        
        // Clone the user info form and append it to the modal
        var form = $('#user-info-form').clone();
        form.removeAttr('style');
        $('#user-info-form-container').html(form);
    });

    $('.exit-modal').on('shown.bs.modal', function (e) {
        timer = setTimeout(function(){
            window.location.href = "http://www.jqueryscript.net";
        }, 4000);
    });

    $('.exit-modal').on('hide.bs.modal', function (e) {
        clearTimeout(timer);
    });

    // Handle form submission
    $('.submit-user-info').on('click', function () {
        var name = $('#name').val();
        var solanaWallet = $('#solana-wallet').val();

        if (name && solanaWallet) {
            var userInfo = {
                name: name,
                solanaWallet: solanaWallet
            };

            // Save user info in JSON format
            var jsonUserInfo = JSON.stringify(userInfo);
            console.log('User info saved:', jsonUserInfo);

            // You can send this JSON to a server or save it locally
            // For example, to save it locally:
            localStorage.setItem('userInfo', jsonUserInfo);

            // Close the modal and allow the user to leave
            $('.exit-modal').modal('hide');
            window.location.href = "http://www.jqueryscript.net";
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Show the modal when the user tries to leave the page
    $(window).on('beforeunload', function(e) {
        $('.exit-modal').modal('show');
        e.preventDefault();
        e.returnValue = '';
    });
});
