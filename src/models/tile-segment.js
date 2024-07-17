
// Segments are a little complicated, and I'm still working on their
// implementation. A segment is a single feature of a tile. A tile might have
// a room and a hall for instace. Both would have their own segment state in
// order to keep track of upgrades and such. The tile graphics will be built
// in layers with one layer for each segment, with transparent masks that
// allow for all the other segments to be seen through the layer stack.
//
// I'm going to need a global segment registry as well because a feature is
// comprised of multiple tiles. They become a feature when the segments are
// 'completed' that is, all of the joined edges have been filled. This is
// clearly a many-to-many relationship so we'll probably want a join table to
// associate tile ids to feature ids.
//
// When a tile is first built though all it has are it's default segments,
// which should all be set to base or incomplete. If there are exits we know
// the tile is incomplete. If there are no exits the feature is a single tile
// feature and starts at the 'base' state. At least, that's my current
// thinking on how this will work.

global.TileSegment = function(tile, index, options={}) {

  const $tile = tile;
  const $index = index;
  const $form = options.form || (getSegmentData().exits.length === 0 ? _base : _incomplete);

  function getSegmentData() { return $tile.getTileData().segments[$index]; }
  function getTile() { return $tile; }
  function getIndex() { return $index; }
  function getForm() { return $form; }

  function pack() {
    return {
      index: $index,
      form: $form,
    };
  }

  return Object.freeze({
    getSegmentData,
    getTile,
    getIndex,
    getForm,
    pack,
  });
}

TileSegment.unpack = function(tile, data) {
  return TileSegment(tile, data.index, { form:data.form });
}
