'use strict';
var wheels = {
  '1': [{ side_a: 'a', side_b: 'b' }, { side_a: 'b', side_b: 'c' }, { side_a: 'c', side_b: 'd' }, { side_a: 'd', side_b: 'e' }, { side_a: 'e', side_b: 'f' }, { side_a: 'f', side_b: 'g' }, { side_a: 'g', side_b: 'h' }, { side_a: 'h', side_b: 'i' }, { side_a: 'i', side_b: 'j' }, { side_a: 'j', side_b: 'k' }, { side_a: 'k', side_b: 'l' }, { side_a: 'l', side_b: 'm' }, { side_a: 'm', side_b: 'n' }, { side_a: 'n', side_b: 'o' }, { side_a: 'o', side_b: 'p' }, { side_a: 'p', side_b: 'q' }, { side_a: 'q', side_b: 'r' }, { side_a: 'r', side_b: 's' }, { side_a: 's', side_b: 't' }, { side_a: 't', side_b: 'u' }, { side_a: 'u', side_b: 'v' }, { side_a: 'v', side_b: 'w' }, { side_a: 'w', side_b: 'x' }, { side_a: 'x', side_b: 'y' }, { side_a: 'y', side_b: 'z' }, { side_a: 'z', side_b: 'a' }],
  '2': [{ side_a: 'a', side_b: 'n' }, { side_a: 'b', side_b: 'a' }, { side_a: 'c', side_b: 'y' }, { side_a: 'd', side_b: 'f' }, { side_a: 'e', side_b: 'x' }, { side_a: 'f', side_b: 'd' }, { side_a: 'g', side_b: 'v' }, { side_a: 'h', side_b: 's' }, { side_a: 'i', side_b: 'h' }, { side_a: 'j', side_b: 'q' }, { side_a: 'k', side_b: 'p' }, { side_a: 'l', side_b: 'k' }, { side_a: 'm', side_b: 'l' }, { side_a: 'n', side_b: 't' }, { side_a: 'o', side_b: 'b' }, { side_a: 'p', side_b: 'm' }, { side_a: 'q', side_b: 'j' }, { side_a: 'r', side_b: 'r' }, { side_a: 's', side_b: 'c' }, { side_a: 't', side_b: 'e' }, { side_a: 'u', side_b: 'w' }, { side_a: 'v', side_b: 'u' }, { side_a: 'w', side_b: 'i' }, { side_a: 'x', side_b: 'g' }, { side_a: 'y', side_b: 'z' }, { side_a: 'z', side_b: 'o' }]
};

var apply_wire = function apply_wire(wheel, letter, input_side, output_side) {
  return wheel.filter(function (wire) {
    return wire[input_side] === letter;
  })[0][output_side];
};

var apply_wheel = function apply_wheel(message, wheel) {
  var reversed = arguments[2] === undefined ? false : arguments[2];

  var input_side = reversed ? 'side_b' : 'side_a';
  var output_side = reversed ? 'side_a' : 'side_b';
  return message.split('').map(function (letter) {
    return apply_wire(wheel, letter, input_side, output_side);
  }).join('');
};

var get_wheel = function get_wheel(label) {
  return wheels[label];
};

var apply_flipped_wheel = function apply_flipped_wheel(message, wheel) {
  return apply_wheel(message, wheel, true);
};

var encode = function encode(message, arrangement) {
  return arrangement.map(get_wheel).reduce(apply_wheel, message);
};

var decode = function decode(message, arrangement) {
  return arrangement.reverse().map(get_wheel).reduce(apply_wheel, message);
};

var elements = ['encode', 'decode', 'input', 'output', 'wheels'].reduce(function (object, id) {
  object[id] = document.getElementById(id);
  return object;
}, {});

var get_arrangement = function get_arrangement() {
  return elements.wheels.value.split(',').map(function (el) {
    return el.trim();
  });
};

var transform = function transform(message, arrangement) {
  var fn = elements.encode.checked ? encode : decode;
  return fn(message, arrangement);
};

var enigma = function enigma() {
  elements.output.value = transform(elements.input.value, get_arrangement());
};

elements.input.addEventListener('keyup', enigma);
