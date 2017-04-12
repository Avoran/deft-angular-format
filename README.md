# Js-Text-Formatter [![Build Status](https://travis-ci.org/Avoran/js-text-formatter.svg)](https://travis-ci.org/Avoran/js-text-formatter)[![codecov.io](https://codecov.io/gh/Avoran/js-text-formatter/coverage.svg?branch=master)](https://codecov.io/gh/Avoran/js-text-formatter?branch=master)

Js-Text-Formatter is a small module that allows you to easily format your input e.g. zipCode in a generic way.
You can use either the [angular](http://angularjs.org) directive, the [jQuery](http://jquery.com) plugin or the formatter on its own.

## Installing Js-Text-Formatter

- Clone the repo: `git clone https://github.com/Avoran/js-text-formatter.git`

- Install with NPM: `npm install js-text-formatter`

## Using Js-Text-Formatter

#### native javascript

```html
<script src="/path/to/your/scripts/here/dist/formatter.min.js"></script>
```
- Use the formatter like:
```javascript
var formatter = new Formatter({format: '4D 2S'});
var formattedVar = formatter.format(varToFormat);
```

#### angular

```html
<script src="/path/to/your/scripts/here/dist/angular-formatter.min.js"></script>
```

- Add a dependency to `av.format` in your app module, eg: `angular.module('myModule', ['av.format'])`
- Format an input like:
```html
<div>
  <input ng-model="zipCode" av-format="4D 2S" />
</div>
```

#### jQuery

```html
<script src="/path/to/your/scripts/here/dist/jquery-formatter.min.js"></script>
```

- Format an input in html like:
```html
<div>
  <input av-format="4D 2S" />
</div>
```
- or call the formatter on an input like:
```javascript
$('input').avFormat('4D 2S');
```

## Documentation

There are currently 3 types of data you can give in your format string:

* Quantifier
* Command
* Extra content

### Quantifier

A quantifier is nothing more than an whole, positive, number you add to your string. Directly after it should de command be found.<br />
A quantifier is to specify how much times you want to use the following command, e.g. how many digits you want formatted.

### Command

The following command can be a `D` or a `S`. With the `D` you specify to format digits and with the `S` currently the rest, spaces excluded.  

### Extra content

Extra content is everything else. You can escape Quantifiers by adding a slash. This is not nescessary when no command is followed.<br />
Adding slashes on it's own is currently not featured.
