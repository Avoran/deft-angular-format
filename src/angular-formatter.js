/*
 * angular-formatter.js - v1.1.2
 * https://github.com/Avoran/js-text-formatter
 */
angular.module('av.format', [])
  .factory('AvFormatter', function() {
    return { get: function(format) { return new Formatter(format); } }
  })
  .directive('avFormat', function (AvFormatter) {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {format:'@avFormat' },
      link: function (scope, element, attrs, ngModel) {
        if (!ngModel) return;
        var formatter = AvFormatter.get(scope.format);
        ngModel.$parsers.unshift(function (inputValue) {
          return formatter.format(inputValue);
        });
        element.blur(function() {
          var output = formatter.format(element.val());
          element.val(output);
          ngModel.$setViewValue(output);
        });
      }
    };
  })
;
