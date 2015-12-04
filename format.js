angular.module('deft.format', [])
  .directive('deftFormat', function () {
    function executeFormat(format, input) {
      format = ' ' + format; // Add so the [^\\] will find the first one if there is nothing before the quantifier
      // @todo escaped slashes should be taken into consideration
      var regex = new RegExp(/[^\\]([\d*]+)([SD])/); // Regex to find quantifier and command as %1 and %2
      var matches = regex.exec(format); // If a match is found, %1 and %2 will be available as well
      var index = format.search(regex) + 1; // +1 because of the [^\\] which we do want in our output

      var output = index ? format.substring(1, index) : format.substring(1); // We don't want the first space we added ourselves
      output = removeEscapeSlashes(output); // These slashes are there to escape, not to show
      input = trimExtraContentFromInput(input, output); // Remove content once that is added from both format and input

      if (matches) { // When there are matches we can format some extra data from the input
        var io = buildIO(matches[1], matches[2], input); // Get the output to add and remaining input for futher handling
        output += io.output;

        output += executeFormat( // Recursively handle the whole format until everything is handled
          format.substring(index -1).replace(matches[0], ''), // Removes the handled data from te format
          io.remainingInput // Get the unhandled input data
        );
      }

      return output;
    }

    function removeEscapeSlashes(output) {
      // @todo escaped slashes should be taken into consideration
      return output.replace(/\\/g, '');
    }

    function trimExtraContentFromInput(input, content) {
      if (!content) return input;
      var regexString = '^' + escapeChar(content[0]); // Directly add the first char
      content = content.substring(1);
      _.forEach(content, function(char) { regexString += escapeChar(char) + '?'; }); // Build the regex to find (a piece of) the extra content at the start of the input

      return input.replace(new RegExp(regexString), ''); // Remove the found extra content
    }

    function escapeChar(char) {
      if (_.contains(['\\', '-', ']'], char)) char += '\\'; // Within a character set, only these need to be escaped

      return '[' + char + ']'; // Return as a character set
    }

    function buildIO(quantifier, command, input) {
      var io = {
        remainingInput: input,
        output: ''
      };

      _.forEach(input, function(char) {
        // @todo build something for the '*' quantifier

        if (io.output.length == quantifier) return; // When the output has the length of the quantifier, it is enough

        io.remainingInput = io.remainingInput.substring(1); // Slice first char of the remainingInput

        // @todo build something to specify chars better than digits or 'the rest'
        if (char === ' ') return; // Spaces are stupid to format, they give very unclear results.

        if (parseInt(char) + '' === char) {
          if (command == 'D') io.output += char; // Char is correct output when it's an int and command says it should be
        } else {
          if (command == 'S') io.output += char; // Char is correct output when it's a string and command says it should be
        }
      });

      return io;
    }

    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {format:'@deftFormat' },
      link: function (scope, element, attrs, ngModel) {
        if (!ngModel) return;
        ngModel.$parsers.unshift(function (inputValue) {
          return executeFormat(scope.format, inputValue);
        });
        element.blur(function() {
          element.val(executeFormat(scope.format, element.val()));
        });
      }
    };
  })
;
