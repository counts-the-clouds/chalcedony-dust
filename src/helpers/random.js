global.Random = {

  // Random number between 0 and the limit exclusive, meaning upTo(100) will
  // return between 0 and 99.
  upTo(limit) {
    return Math.floor(Math.random() * limit);
  },

  // Roll 1d(rand) + plus.
  roll(rand, plus=0) {
    return Random.upTo(rand)+plus;
  },

  // Simulate rolling dice. Options:
  //   { x:(dice count), d:(dice faces), p:(plus or minus) }
  rollDice(options) {
    let total = options.p || 0;
    for (let x = 0; x<(options.x || 1); x++) {
      total += Random.roll(options.d || 6) + 1;
    }
    return total;
  },

  // Rolls between the new numbers inclusive, meaning min or max value could be
  // chosen.
  between(min, max) {
    return Random.roll(max-min+1,min);
  },

  // Select a random element in an array.
  from(array) {
    if (array && array.length) {
      return array[Random.upTo(array.length)];
    }
  },

  // Heads or tails, 50% probability.
  flipCoin() {
    return Random.roll(2) === 0;
  },

  // Select a random value from a weighted frequency map. Frequency maps should
  // have the form:
  //
  //   { codeA:10, codeB:100, codeC:50 }
  //
  // It doesn't matter what the values of the keys add up to or what they are
  // the ratios between the numbers determine the probability
  fromFrequencyMap(map) {
    let index = 0;
    let keys = Object.keys(map);
    let random = Random.upTo(Object.values(map).reduce(function(a,v) { return a+v; }));

    for (let i=0; i<keys.length; i++) {
      index += map[keys[i]];
      if (random < index) {
        return keys[i];
      }
    }

    throw 'Invalid frequency map';
  },

  // Randomize an array, usually so it can be iterated through in a random order.
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  // This generates a random number, near the average number in a tight bell
  // curve distribution. The amount of fuzz is the amount that the randomly
  // chosen number can deviate from the average number.
  tightlyBound(average, fuzz) {
    let base = average - (fuzz / 2);
    let cut = Random.geometric(50) * (fuzz/100);
    return Math.round(cut + base)
  },

  // This generates a number between 1 and 100 that has a fairly wide bell curve
  // distribution around the average number by rolling 10d10 against the average
  // and tallying and fuzzing the result. There are probably way better ways to
  // do this, but I'm not a math guy.
  geometric(average) {
    let result = Random.upTo(20)-10;

    for (let i=0; i<10; i++) {
      if (Random.upTo(100) <= average) {
        result += 10;
      }
    }

    if (result < 1) { return 1; }
    if (result > 100) { return 100; }
    return result;
  },

}
