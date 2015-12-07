angular.module('deft.format', [])
  .factory('DeftFormatter', function() {
    return { get: function(format) { return new Formatter(format); } }
  })
  .directive('deftFormat', function (DeftFormatter) {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {format:'@deftFormat' },
      link: function (scope, element, attrs, ngModel) {
        if (!ngModel) return;
        var formatter = DeftFormatter.get(scope.format);
        ngModel.$parsers.unshift(function (inputValue) {
          return formatter.format(inputValue);
        });
        element.blur(function() {
          element.val(formatter.format(element.val()));
        });
      }
    };
  })
;
