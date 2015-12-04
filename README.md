# Deft-Angular-Format

Deft-Angular-Arrow is a small [angular](http://angularjs.org) module that allows you to easily format your input e.g. zipCode in a general way

## Installing Deft-Angular-Format

- Clone the repo: `git clone https://github.com/deft/deft-angular-format.git`
```
<script src="/path/to/your/scripts/here/format.js"></script>
```

- Install with Bower: `bower install deft-angular-format`
```
<script src="/bower_components/deft-angular-format/format.js"></script>
```


## Using Deft-Angular-Format

- Add a dependency to `deft.format` in your app module, eg: `angular.module('myModule', ['deft.format'])`
- Format an input like:
```
<div>
	<input ng-model="zipCode" deft-format="4D 2S" />
</div>
```

## Documentation

The formatter will execute immediately for ng-model parser, however, will wait till blur to update the input.

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
