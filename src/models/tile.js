global.Tile = function(data) {

  Validate.exists('code',data.code);

  const $code = data.code;
  const $id = data.id || TileDataStore.nextID();

  let $coordinates = data.coordinates;
  let $rotation = data.rotation || 0;
  let $edges = data.edges;
  let $extra = data.extra || {};

  let $segments = data.segments;
  let $clockID = data.clockID;

  // If the tile data specifies that this tile should have a clock we add it
  // to the tile automatically. This clock won't actually do anything until
  // it's added to the ClockManager when the tile is added to the dungeon.
  function buildClock() {
    if ($clockID == null && getTileData().clock) {
      $clockID = Clock({ code:getTileData().clock.code }).getID();
    }
  }

  // Build the Segments if they weren't passed in the options. If this Tile
  // is coming from a packed Tile it should have segments. If it's from a new
  // tile though they won't be present.
  function buildSegments() {
    if ($segments == null) {
      $segments = [];

      const tileData = getTileData();
      const empty = tileData.emptyEdgeType || _stone;

      $edges = { n:empty, s:empty, e:empty, w:empty };

      for (let index=0; index<tileData.segments.length; index++) {
        const segment = Segment({ tileID:$id, tileCode:$code, index:index });

        segment.getExits().forEach(exit => {
          $edges[exit] = segment.getType();
        });

        $segments.push(segment.getID());
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

  function getClock() { return ClockDataStore.get($clockID); }
  function setCoordinates(coordinates) { $coordinates = coordinates; }
  function getCoordinates() { return { ...$coordinates }; }

  function getNeighbors() {
    const x = $coordinates.gx;
    const y = $coordinates.gy;

    return {
      n: DungeonGrid.getTile(Coordinates.fromGlobal(x,y - 1)),
      s: DungeonGrid.getTile(Coordinates.fromGlobal(x,y + 1)),
      e: DungeonGrid.getTile(Coordinates.fromGlobal(x + 1,y)),
      w: DungeonGrid.getTile(Coordinates.fromGlobal(x - 1,y)),
    }
  }

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

  // === Segments ===

  function getSegmentIDs() { return $segments; }
  function getSegments() { return $segments.map(id => { return SegmentDataStore.get(id); }); }

  function getSegmentWithExit(direction) {
    return getSegments().filter(segment => {
      return segment.getExits(getRotation()).includes(direction)
    })[0];
  }

  // The getLayers() function gets current forms of all the segments so that
  // they can be drawn in the user interface.

  function getLayers() {
    return getSegments().map(segment => {
      const form = segment.getSegmentData().forms[segment.getForm()]
      const layer = { background: form.background };

      if (form.angle) { layer.angle = form.angle; }

      return layer;
    });
  }

  function getFeatures() {
    return ArrayHelper.compact(getSegments().map(segment => {
      return segment.getFeature();
    }))
  }

  // === Serialization ===

  function toString() {
    return `Tile:${$id}[${$code}]`
  }

  function pack() {
    return {
      code: $code,
      id: $id,

      clockID: $clockID,
      coordinates: $coordinates,
      rotation: $rotation,
      edges: $edges,
      segments: $segments,
      extra: $extra,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
    getCode,
    getTileData,
    getID,
    getDrawNote,
    getPlacementEvent,
    getPlacementTrigger,
    getPlacementRules,
    getPlacementNote,
    getClock,
    setCoordinates,
    getCoordinates,
    getNeighbors,

    rotateClockwise,
    rotateWiddershins,
    setRotation,
    getRotation,

    getEdges,
    getSegmentIDs,
    getSegments,
    getSegmentWithExit,
    getLayers,
    getFeatures,

    toString,
    pack,
  });

  buildClock();
  buildSegments();

  TileDataStore.store($self);

  return $self;
}
