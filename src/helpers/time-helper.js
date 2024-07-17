global.TimeHelper = {

  // Is date/time format with leading 0s a thing in Javascript? Or is that just
  // a nightmare not worth looking into?
  getTimeString: function() {
    const date = new Date();
    let h = `${date.getHours()}`
    let m = `${date.getMinutes()}`
    let s = `${date.getSeconds()}`

    if (h.length === 1) { h = `0${h}` }
    if (m.length === 1) { m = `0${m}` }
    if (s.length === 1) { s = `0${s}` }

    return `${h}:${m}:${s}`
  },

};