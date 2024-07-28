global.Tile = function(code, options={}) {

  TileRegistry.lookup(code);

  const $code = code;
  const $id = options.id || GameState.nextTileID();
  const $placementEvent = options.placementEvent;
  const $placementTrigger = options.placementTrigger;
  const $placementRules = options.placementRules;

  const $placementNote = options.placementNote;
  const $drawNote = options.drawNote;

  if ($placementNote) { NoteRegistry.lookup($placementNote); }
  if ($drawNote) { NoteRegistry.lookup($drawNote); }

  let $coordinates;
  let $rotation = 0;
  let $segments;

  function getCode() { return $code; }
  function getTileData() { return TileRegistry.lookup($code); }
  function getID() { return $id; }

  function getDrawNote() { return $drawNote; }
  function getPlacementEvent() { return $placementEvent; }
  function getPlacementTrigger() { return $placementTrigger; }
  function getPlacementRules() { return $placementRules; }
  function getPlacementNote() { return $placementNote; }

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

  // The getLayers() function should return the current forms of all the segments so that they can
  // be drawn in the user interface. Right now the layers only contain backgrounds. At some point
  // we'll probably need to add icons and shit.
  function getLayers() {
    return $segments.map(segment => {
      return { background: segment.getSegmentData().forms[segment.getForm()].background };
    });
  }

  // === Serialization ===

  function pack() {
    let tileData = {
      code: $code,
      id: $id,
      coordinates: $coordinates,
      rotation: $rotation,
      drawNote: $drawNote,
      placementEvent: $placementEvent,
      placementTrigger: $placementTrigger,
      placementRules: $placementRules,
      placementNote: $placementNote,
    }

    if ($segments) {
      tileData.segments = $segments.map(segment => {
        return segment.pack();
      });
    }

    return tileData;
  }

  function toString() {
    return `Tile[${$id}|${$code}]`
  }

  return Object.freeze({
    getCode,
    getTileData,
    getID,
    getDrawNote,
    getPlacementEvent,
    getPlacementTrigger,
    getPlacementRules,
    getPlacementNote,
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

    getLayers,
    pack,
    toString,
  });
}

Tile.unpack = function(data) {
  let tile = Tile(data.code, {
    id: data.id,
    drawNote: data.drawNote,
    placementEvent: data.placementEvent,
    placementTrigger: data.placementTrigger,
    placementRules: data.placementRules,
    placementNote: data.placementNote,
    enableNote: data.enableNote,
  });

  tile.setCoordinates(data.coordinates);
  tile.setRotation(data.rotation);

  if (data.segments) {
    tile.setSegments(data.segments.map(segmentData => {
      return TileSegment.unpack(tile,segmentData);
    }));
  }

  return tile;
}
