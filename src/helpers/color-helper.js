global.ColorHelper = {

  hexValueToColors: function(number) {
    const hex = number.toString(16);
    return {
      r: parseInt(hex.substring(0,2),16),
      g: parseInt(hex.substring(2,4),16),
      b: parseInt(hex.substring(4,6),16),
    }
  }

}