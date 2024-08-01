global.TileSegment = function(tile,data) {

  const $tile = tile;
  const $index = data.index;
  const $form = data.form || (getExits().length === 0 ? _base : _incomplete);

  function getTile() { return $tile; }
  function getIndex() { return $index; }
  function getForm() { return $form; }

  function getSegmentData() { return TileRegistry.lookup($tile.getCode()).segments[$index] }
  function getType() { return getSegmentData().type; }
  function getExits() { return getSegmentData().exits; }

  function toString() {
    return `TileSegment[${tile.getID()}:${$index}]`
  }

  function pack() {
    return {
      index: $index,
      form: $form,
    };
  }

  return Object.freeze({
    getTile,
    getIndex,
    getForm,
    getSegmentData,
    getType,
    getExits,
    toString,
    pack,
  });
}
