global.Note = function(code, options) {

  const $code = code;
  const $text = options.text;
  const $delay = options.delay || 100;

  let $trigger;

  if (typeof $text !== 'string') {
    throw `Note text is required.`
  }

  function getCode() { return $code }
  function getText() { return $text }
  function getDelay() { return $delay }

  // The only trigger currently is _drawn, which is triggered by the
  // TileShelfComponent when the tile is drawn and placed on the tile shelf.
  function getTrigger() { return $trigger }
  function setTrigger(when) { $trigger = when; }

  return Object.freeze({
    getCode,
    getText,
    getDelay,
    getTrigger,
    setTrigger,
  });
}
