/**
 * Submit postLinks via Ajax
 *
 * @options:
 * - successCallback: function executed, after servers response = true
 * - errorCallback: function executed, on error
 *
 * @use
 * $(selector).ajaxPostLink({
 *     errorCallback: function(errorMessage) {},
 *     successCallback: function(message, element) {},
 *     errorMessage: 'defaulterrormessage'
 * });
 */
(function($) {
    $.fn.ajaxPostLink = function(options) {

        // Extend our default options with those provided.
        // Note that the first argument to extend is an empty
        // object – this is to keep from overriding our "defaults" object.
        var opts = $.extend({}, $.fn.ajaxPostLink.defaults, options);

        // Remove CakePHP's click event
        this.removeAttr('onclick');

        // Bind new click event
        this.click(function(event) {
            event.preventDefault();

            var anchor = $(this);
            var form = anchor.prev();
            var formAction = form.attr('action');

            // Submit Form via ajax
            $.ajax({
                type: "POST",
                url: formAction,
                data: form.serialize(),
                success: function(response, textStatus, jqXHR) {
                    if (response.status === true) {
                        opts.successCallback(response.message, anchor);
                        return true;
                    }

                    if (response.message) {
                        opts.errorCallback(response.message);
                        return false;
                    }

                    opts.errorCallback(opts.errorMessage);
                    return false;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    opts.errorCallback(errorMessage);
                    console.error(errorThrown);
                }
            });
        });
    };

    // Plugin defaults – added as a property on our plugin function.
    $.fn.ajaxPostLink.defaults = {
        successCallback: function() {
            alert('Success');
        },
        errorCallback: function(error) {
            alert(error);
        },
        errorMessage: 'An Error occured.'
    };
}(jQuery));
