var seedRandom = require('seed-random');
var palettes = require('./lib/color-palettes.json');
var createRandomRange = require('./lib/random-range');

module.exports = function (seed) {
  if (typeof seed === 'undefined') {
    seed = String(Math.floor(Math.random() * 1000000));
  }

  console.log('Seed:', seed);

  var randomFunc = seedRandom(seed);
  var random = createRandomRange(randomFunc);

  var maps = [
    'pattern-01.jpg',
    'pattern-02.jpg',
    'pattern-03.jpg',
    'pattern-04.jpg',
    'pattern-05.jpg',
    'pattern-06.jpg',
    'pattern-07.jpg',
    'pattern-08.jpg',
    'pattern-09.jpg',
    'pattern-10.jpg',
    'pattern-11.jpg',
    'pattern-12.jpg',
  ].map(function (p) {
    return 'maps/' + p;
  });

  var mapSrc = maps[Math.floor(random(maps.length))];

  return {
    // rendering options
    random: randomFunc,
    seedName: seed,
    pointilism: random(0, 0.1),
    noiseScalar: [ random(0.000001, 0.000001), random(0.0002, 0.004) ],
    globalAlpha: 0.5,
    startArea: random(0.0, 1.5),
    maxRadius: random(5, 100),
    lineStyle: random(1) > 0.5 ? 'round' : 'square',
    interval: random(0.001, 0.01),
    count: 5000, // TODO: play with this number
    steps: 8000, // TODO: play with this number
    endlessBrowser: true, // Whether to endlessly step in browser

    // background image that drives the algorithm
    debugLuma: false,
    backgroundScale: 1,
    backgorundFille: 'black',
    backgroundSrc: mapSrc,

    // browser/node options
    pixelRatio: 1,
    width: 1280 * 2,
    height: 720 * 2,
    palette: getPalette(),

    // node only options
    asVideoFrames: false,
    filename: 'render',
    outputDir: 'output'
  };

  function getPalette () {
    var paletteColors = palettes[Math.floor(random() * palettes.length)];
    return arrayShuffle(paletteColors);
  }

  function arrayShuffle (arr) {
    var rand;
    var tmp;
    var len = arr.length;
    var ret = arr.slice();

    while (len) {
      rand = Math.floor(random(1) * len--);
      tmp = ret[len];
      ret[len] = ret[rand];
      ret[rand] = tmp;
    }

    return ret;
  }
};
