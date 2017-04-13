/*
 * jquery-formatter.js - v1.1.2
 * https://github.com/Avoran/js-text-formatter
 */

+function ($) {
    'use strict';

    $.fn.avFormat = function(options) {
        return this.each(function() {
            var self = $(this);
            if (self.data('av-format-initialised')) return;
            self.data('av-format-initialised', 'true');

            var settings = $.extend({}, $.fn.avFormat.defaults, options );

            var formatter = new Formatter(settings);

            self.on('change keyup blur', function() {
                self.val(formatter.format(self.val()));
            })
        })
    };

    $.fn.avFormat.defaults = {
        format: "",
        debug: false
    };
}(jQuery);

$(function() {
    $('[av-format]').each(function() {
        $(this).avFormat({format: $(this).attr('av-format')});
    });
});
