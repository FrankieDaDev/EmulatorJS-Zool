(function($) {
    $.fn.exitModal = function(options) {
        var settings = $.extend({
            showOnce: true,
            showDelay: 0,
            closeDelay: 0,
            onShow: function() {},
            onClose: function() {}
        }, options);

        var modal = this;
        var shown = false;

        function showModal() {
            if (!shown && settings.showOnce) {
                modal.modal('show');
                settings.onShow();
                shown = true;
            }
        }

        function closeModal() {
            modal.modal('hide');
            settings.onClose();
        }

        $(window).on('beforeunload', function(e) {
            showModal();
            e.preventDefault();
            e.returnValue = '';
        });

        modal.on('hidden.bs.modal', function() {
            if (settings.closeDelay > 0) {
                setTimeout(function() {
                    closeModal();
                }, settings.closeDelay);
            } else {
                closeModal();
            }
        });

        return this;
    };
})(jQuery);