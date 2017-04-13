/*
 * formatter.js - v1.1.2
 * https://github.com/Avoran/js-text-formatter
 */

/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  var _ = require('lodash');
  module.exports = Formatter;
}

function Formatter (options) {

  this.format = function(input) {
    return _format(input, _.defaults(options, {format: '', debug: false}));
  };

  var _format = function(input, options) {
    var format = ' ' + options.format; // Add so the [^\\] will find the first one if there is nothing before the quantifier
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

      if (io.done) {
        output += _format( // Recursively handle the whole format until everything is handled
          io.remainingInput, // Get the unhandled input data
            _.defaults({format: format.substring(index -1).replace(matches[0], '')}, options) // Removes the handled data from te format
        );
      }
    }

    /* istanbul ignore next */
    if (options.debug && console && console.log) {
      console.log('---------- avFormatter ----------');
      console.log('avFormatter - input: ' + input);
      console.log('avFormatter - output: ' + output);
      console.log('avFormatter - format: ' + format);
      console.log('--------- /avFormatter ----------');
    }

    return output;
  };

  var removeEscapeSlashes = function(output) {
    // @todo escaped slashes should be taken into consideration
    return output.replace(/\\/g, '');
  };

  var trimExtraContentFromInput = function(input, content) {
    if (!content) return input;
    var regexString = '^' + escapeChar(content[0]); // Directly add the first char
    content = content.substring(1);
    _.forEach(content, function(char) { regexString += escapeChar(char) + '?'; }); // Build the regex to find (a piece of) the extra content at the start of the input

    return input.replace(new RegExp(regexString), ''); // Remove the found extra content
  };

  var escapeChar = function(char) {
    if (_.includes(['\\', '-', ']'], char)) char = '\\' + char; // Within a character set, only these need to be escaped

    return '[' + char + ']'; // Return as a character set
  };

  var buildIO = function(quantifier, command, input) {
    var io = {
      remainingInput: input,
      output: '',
      done: false
    };

    _.forEach(input, function(char) {
      // @todo build something for the '*' quantifier

      if (io.output.length == quantifier) return io.done = true; // When the output has the length of the quantifier, it is enough

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
  };
}
