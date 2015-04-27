'use strict';

Array.prototype.find = function (fn) {
  return this.filter(fn)[0];
};

var wheels = {
  '1': [{ side_a: 'a', side_b: 'b' }, { side_a: 'b', side_b: 'c' }, { side_a: 'c', side_b: 'd' }, { side_a: 'd', side_b: 'a' }],
  '2': [{ side_a: 'a', side_b: 'd' }, { side_a: 'b', side_b: 'c' }, { side_a: 'c', side_b: 'b' }, { side_a: 'd', side_b: 'a' }],
  '3': [{ side_a: 'a', side_b: 'c' }, { side_a: 'b', side_b: 'd' }, { side_a: 'c', side_b: 'a' }, { side_a: 'd', side_b: 'b' }]
};

var reflector = [{ side_a: 'a', side_b: 'b' }, { side_a: 'b', side_b: 'a' }, { side_a: 'c', side_b: 'd' }, { side_a: 'd', side_b: 'c' }];

var apply_wire = function apply_wire(wheel, letter) {
  return wheel.find(function (wire) {
    return wire.side_a === letter;
  }).side_b;
};

var identify_wheel = function identify_wheel(wheel) {
  return wheel.reduce(function (string, wire) {
    return '' + string + '' + wire.side_a + '>' + wire.side_b + ', ';
  }, '');
};

var apply_wheel = function apply_wheel(message, wheel) {
  var reversed = arguments[2] === undefined ? false : arguments[2];

  var m = message.split('').map(function (letter) {
    return apply_wire(wheel, letter);
  }).join('');
  console.log(identify_wheel(wheel), m);
  return m;
};

var get_wheel = function get_wheel(label) {
  return wheels[label];
};

var get_flipped_wheel = function get_flipped_wheel(label) {
  return flip(wheels[label]);
};

var flip = function flip(wheel) {
  return wheel.map(function (wire) {
    return {
      side_a: wire.side_b,
      side_b: wire.side_a
    };
  });
};

var encode = function encode(message, arrangement) {
  return arrangement.map(get_wheel).concat([reflector]).concat(arrangement.reverse().map(get_flipped_wheel)).reduce(apply_wheel, message);
};

var enigma = function enigma() {
  elements.output.value = encode(get_message(), get_arrangement());
};

var elements = ['encode', 'input', 'output', 'wheels'].reduce(function (object, id) {
  object[id] = document.getElementById(id);
  return object;
}, {});

var get_arrangement = function get_arrangement() {
  return elements.wheels.value.split(',').map(function (el) {
    return el.trim();
  });
};

var get_message = function get_message() {
  return elements.input.value;
};

elements.input.addEventListener('keyup', enigma);
