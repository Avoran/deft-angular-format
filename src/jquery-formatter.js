/*
 * jquery-formatter.js - v1.1.1
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
    var $elem = $('[av-format]');
    $elem.avFormat({format: $elem.attr('av-format')});
});
