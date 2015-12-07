angular.module('deft.format', [])
  .factory('Formatter', function() {
    return { get: function(format) { return new Formatter(format); } }
  })
  .directive('deftFormat', function () {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {format:'@deftFormat' },
      link: function (scope, element, attrs, ngModel, Formatter) {
        if (!ngModel) return;
        var formatter = Formatter.get(scope.format);
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
