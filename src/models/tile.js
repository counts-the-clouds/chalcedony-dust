global.Tile = function(code, options={}) {

  TileRegistry.lookup(code);

  const $code = code;
  const $id = options.id || GameState.nextTileID();
  const $placementEvent = options.placementEvent;
  const $placementTrigger = options.placementTrigger;
  const $placementRules = options.placementRules;
  const $enableNote = options.enableNote;

  if (options.enableNote) {
    NoteRegistry.lookup($enableNote.code);
  }

  let $coordinates;
  let $rotation = 0;
  let $segments;

  function getCode() { return $code; }
  function getTileData() { return TileRegistry.lookup($code); }
  function getID() { return $id; }

  function getPlacementEvent() { return $placementEvent; }
  function getPlacementTrigger() { return $placementTrigger; }
  function getPlacementRules() { return $placementRules; }

  function setCoordinates(coordinates) { $coordinates = coordinates; }
  function getCoordinates() { return { ...$coordinates }; }

  // === Rotation ===

  function getRotation() { return $rotation; }
  function rotateClockwise() { if (++$rotation > 3) { $rotation = 0; }}
  function rotateWiddershins() { if (--$rotation < 0) { $rotation = 3; }}

  function setRotation(rotation) {
    if (![0,1,2,3].includes(rotation)) { throw `Invalid rotation ${rotation}`; }
    $rotation = rotation;
  }

  function getEdges() {
    let edges = { ...getTileData().edges };

    if ($rotation === 1) { return { n:edges.w, s:edges.e, e:edges.n, w:edges.s }; }
    if ($rotation === 2) { return { n:edges.s, s:edges.n, e:edges.w, w:edges.e }; }
    if ($rotation === 3) { return { n:edges.e, s:edges.w, e:edges.s, w:edges.n }; }

    return edges;
  }

  // === Segments ===

  function buildSegments() {
    $segments = [];
    for (let index = 0; index < getTileData().segments.length; index++) {
      $segments.push(TileSegment(this,index));
    }
  }

  function setSegments(segments) { $segments = segments; }
  function getSegments() { return $segments; }

  // === Layers ===

  // Right now the layers only contain backgrounds. At some point we'll
  // probably need to add icons and such as well.
  function getClientLayers() {
    return $segments.map(segment => {
      return { background: segment.getSegmentData().forms[segment.getForm()].background };
    });
  }

  // === Note ===

  function getNote() {
    if ($enableNote) {
      const note = NoteRegistry.lookup($enableNote.code);
            note.setTrigger($enableNote.when)

      return note;
    }
  }

  return Object.freeze({
    getCode,
    getTileData,
    getID,
    getPlacementEvent,
    getPlacementTrigger,
    getPlacementRules,

    setCoordinates,
    getCoordinates,

    rotateClockwise,
    rotateWiddershins,
    setRotation,
    getRotation,
    getEdges,

    buildSegments,
    setSegments,
    getSegments,

    getClientLayers,
    getNote,
  });
}
