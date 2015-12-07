if (typeof module !== 'undefined' && module.exports) {
  var QUnit = require('qunitjs');
  var test = QUnit.test;
  require('qunit-tap')(QUnit, console.log);
  var Formatter = require('../src/formatter.js');
}

test('Simple digit format', function(assert) {
  var f = new Formatter('2D');
  assert.equal(f.format('123'), '12');
});
test('Simple text format', function(assert) {
  var f = new Formatter('2S');
  assert.equal(f.format('abc'), 'ab');
});
test('Combined format', function(assert) {
  var f = new Formatter('2D2S');
  assert.equal(f.format('123abc'), '12ab');
});
test('Extra content format', function(assert) {
  var f = new Formatter(' 2D2S');
  assert.equal(f.format('123abc'), ' 12ab');
});
test('Double content format', function(assert) {
  var f = new Formatter('test: 4D 2S');
  assert.equal(f.format('test123abc'), 'test: 123');
});
test('Escaping quantifier format', function(assert) {
  var f = new Formatter('\\12S 2D 3S');
  assert.equal(f.format('a bc123'), '1ab 12 ');
});
test('Escaping double content format', function(assert) {
  var f = new Formatter('2S- 2D]3S');
  assert.equal(f.format('abc-123'), 'ab- 12]');
});

if (typeof module !== 'undefined' && module.exports) { QUnit.load(); }
