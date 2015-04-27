"use strict";

Array.prototype.find = function(fn){
  return this.filter(fn)[0];
};

let wheels = {
  '1': [{ side_a : 'a', side_b: 'b'},
        { side_a : 'b', side_b: 'c'},
        { side_a : 'c', side_b: 'd'},
        { side_a : 'd', side_b: 'a'},
       ],
  '2': [{ side_a : 'a', side_b: 'd'},
        { side_a : 'b', side_b: 'c'},
        { side_a : 'c', side_b: 'b'},
        { side_a : 'd', side_b: 'a'}
       ],
  '3': [{ side_a : 'a', side_b: 'c'},
        { side_a : 'b', side_b: 'd'},
        { side_a : 'c', side_b: 'a'},
        { side_a : 'd', side_b: 'b'}
       ]
};

let reflector = [
  { side_a : 'a', side_b : 'b' },
  { side_a : 'b', side_b : 'a' },
  { side_a : 'c', side_b : 'd' },
  { side_a : 'd', side_b : 'c' }
];

var apply_wire = function(wheel, letter){
  return wheel.find(function(wire) {
    return wire.side_a === letter;
  }).side_b;
};

var identify_wheel = function(wheel){
  return wheel.reduce(function(string, wire){
    return `${string}${wire.side_a}>${wire.side_b}, `;
  },'');
};

var apply_wheel = function(message, wheel, reversed = false) {
  let m = message.split('').map(function(letter) {
    return apply_wire(wheel, letter);
  }).join('');
  console.log(identify_wheel(wheel), m);
  return m;
};

var get_wheel = (label) => wheels[label];

var get_flipped_wheel = (label) => flip(wheels[label]);

var flip = function(wheel){
  return wheel.map(function(wire){
    return{
      side_a: wire.side_b,
      side_b: wire.side_a
    };
  });
};

var encode = function(message, arrangement) {
  return arrangement
    .map(get_wheel)
    .concat([reflector])
    .concat(arrangement.reverse().map(get_flipped_wheel))
    .reduce(apply_wheel, message);
};

var enigma = function(){
  elements.output.value = encode(get_message(), get_arrangement());
};

let elements = ["encode", "input", "output", "wheels"]
.reduce(function(object, id){
  object[id] = document.getElementById(id);
  return object;
}, {} );

let get_arrangement = function(){
  return elements.wheels.value
	.split(',')
	.map((el)=> el.trim());
};

let get_message = ()=> elements.input.value;

elements.input.addEventListener('keyup', enigma);
