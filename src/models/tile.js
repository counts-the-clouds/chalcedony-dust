global.Tile = function(options) {

  const $code = options.code;
  const $id = options.id || GameState.nextTileID();

  let $coordinates = options.coordinates;
  let $rotation = options.rotation || 0;
  let $edges = options.edges;
  let $extra = options.extra || {};

  let $clock;
  let $segments;

  buildClock(options);
  buildSegments(options);

  // If the tile data specifies that this tile should have a clock we add it
  // to the tile automatically. This clock won't actually do anything until
  // it's added to the ClockManager when the tile is added to the dungeon.
  function buildClock(options) {
    if (options.clock) {
      $clock = Clock(options.clock);
    }

    if ($clock == null && getTileData().clock) {
      $clock = Clock({ id:$id, code:getTileData().clock.code });
    }
  }

  // Build the TileSegments if they weren't passed in the options. If this Tile
  // is coming from a packed Tile it should have segments. If it's from a new
  // tile though they won't be present.
  function buildSegments(options) {
    $segments = (options.segments||[]).map(segmentData => {
      return TileSegment.unpack(segmentData);
    });

    if ($segments.length === 0) {
      const empty = getTileData().emptyEdgeType || _stone;

      $edges = { n:empty, s:empty, e:empty, w:empty };

      for (let index=0; index<getTileData().segments.length; index++) {
        const segment = TileSegment($code, index);

        segment.getExits().forEach(exit => {
          $edges[exit] = segment.getType();
        });

        $segments.push(segment);
      }
    }
  }

  // ===========================================================================

  function getCode() { return $code; }
  function getID() { return $id; }

  function getTileData() { return TileRegistry.lookup($code); }
  function getDrawNote()         { return $extra.drawNote         || getTileData().drawNote; }
  function getPlacementEvent()   { return $extra.placementEvent   || getTileData().placementEvent; }
  function getPlacementTrigger() { return $extra.placementTrigger || getTileData().placementTrigger; }
  function getPlacementRules()   { return $extra.placementRules   || getTileData().placementRules; }
  function getPlacementNote()    { return $extra.placementNote    || getTileData().placementNote; }

  function setCoordinates(coordinates) { $coordinates = coordinates; }
  function getCoordinates() { return { ...$coordinates }; }
  function getClock() { return $clock; }

  // === Rotation ===

  function getRotation() { return $rotation; }
  function rotateClockwise() { if (++$rotation > 3) { $rotation = 0; }}
  function rotateWiddershins() { if (--$rotation < 0) { $rotation = 3; }}

  function setRotation(rotation) {
    if (![0,1,2,3].includes(rotation)) { throw `Invalid rotation ${rotation}`; }
    $rotation = rotation;
  }

  function getEdges() {
    if ($rotation === 1) { return { n:$edges.w, s:$edges.e, e:$edges.n, w:$edges.s }; }
    if ($rotation === 2) { return { n:$edges.s, s:$edges.n, e:$edges.w, w:$edges.e }; }
    if ($rotation === 3) { return { n:$edges.e, s:$edges.w, e:$edges.s, w:$edges.n }; }
    return { ...$edges };
  }

  // === Layers ===

  function getSegments() { return $segments; }

  // The getLayers() function should return the current forms of all the segments so that they can
  // be drawn in the user interface. Right now the layers only contain backgrounds. At some point
  // we'll probably need to add icons and shit.
  function getLayers() {
    return $segments.map(segment => {
      const form = segment.getSegmentData().forms[segment.getForm()]
      const layer = { background: form.background };

      if (form.angle) { layer.angle = form.angle; }

      return layer;
    });
  }

  // === Serialization =========================================================

  function pack() {
    let tileData = {
      code: $code,
      id: $id,

      coordinates: $coordinates,
      rotation: $rotation,
      edges: $edges,
      extra: $extra,
    }

    if ($clock) {
      tileData.clock = $clock.pack();
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
    getClock,

    rotateClockwise,
    rotateWiddershins,
    setRotation,
    getRotation,

    getEdges,
    getSegments,
    getLayers,

    pack,
    toString,
  });
}
