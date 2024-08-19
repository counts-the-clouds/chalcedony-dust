global.Tile = function(data) {

  // console.log("=== Building Tile ===")
  // console.log(data);

  const $code = data.code;
  const $id = data.id || TileDataStore.nextID();

  let $coordinates = data.coordinates;
  let $rotation = data.rotation || 0;
  let $edges = data.edges;
  let $extra = data.extra || {};

  // When built, segments will either be an array of segment indices or an
  // array of objects that can be used to build the segments.
  let $segments = data.segments;
  let $clockID = data.clockID;

  // If the tile data specifies that this tile should have a clock we add it
  // to the tile automatically. This clock won't actually do anything until
  // it's added to the ClockManager when the tile is added to the dungeon.
  function buildClock() {
    if ($clockID == null && $code) {
      const tileData = TileRegistry.lookup($code);
      if (tileData.clock) {
        $clockID = Clock({ code:tileData.clock.code }).getID();
      }
    }
  }

  function buildSegments() {
    // If $segments is already an array of number we don't need to do anything.
    if ($segments && $segments.length > 0 && typeof $segments[0] === 'number') {
      return true
    }

    // Segments should only be null when building a standard tile (that is a
    // tile with a code that we get from the TileRegistry)
    if ($segments == null) {
      if ($code == null) { throw `A tile needs a code or segments.` }
      return actuallyBuildSegments(TileRegistry.lookup($code).segments);
    }

    // Otherwise the Tile() constructor should have been given an array of
    // segment data objects in the same format that the standard tiles use.
    if ($segments[0].type) {
      return actuallyBuildSegments($segments);
    }

    throw `Bad format for segments: ${JSON.stringify($segments)}`
  }

  function actuallyBuildSegments(segmentData) {
    $segments = [];
    segmentData.forEach((seg,index) => {
      $segments.push(Segment({ tileID:$id, index:index, segmentData:seg }).getID());
    });
  }

  function determineEdges() {
    $edges = { n:TileType.stone, s:TileType.stone, e:TileType.stone, w:TileType.stone };
    $segments.forEach(id => {
      const segment = SegmentDataStore.get(id);
      segment.getExits().forEach(exit => {
        $edges[exit] = segment.getType();
      });
    });
  }

  // ===========================================================================

  function getCode() { return $code; }
  function getID() { return $id; }

  function getDrawNote()         { return $extra.drawNote         }
  function getDrawTrigger()      { return $extra.drawTrigger      }
  function getPlacementEvent()   { return $extra.placementEvent   }
  function getPlacementTrigger() { return $extra.placementTrigger }
  function getPlacementRules()   { return $extra.placementRules   }
  function getPlacementNote()    { return $extra.placementNote    }

  function setClock(clock) { $clockID = clock.getID(); }
  function getClock() { return ClockDataStore.get($clockID); }
  function setCoordinates(coordinates) { $coordinates = coordinates; }
  function getCoordinates() { return $coordinates ? { ...$coordinates } : null; }

  function distanceToOrigin(coordinates) {
    const x = $coordinates.gx * $coordinates.gx;
    const y = $coordinates.gy * $coordinates.gy;
    return Math.floor(Math.sqrt(x+y));
  }

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

  function addSegment(segment) { $segments.push(segment.getID()); }
  function getSegmentIDs() { return $segments; }
  function getSegments() { return $segments.map(id => { return SegmentDataStore.get(id); }); }
  function resetSegments() { $segments = []; }

  function getSegmentWithExit(direction) {
    return getSegments().filter(segment => {
      return segment.getExits(getRotation()).includes(direction)
    })[0];
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
    getID,
    getDrawNote,
    getDrawTrigger,
    getPlacementEvent,
    getPlacementTrigger,
    getPlacementRules,
    getPlacementNote,
    setClock,
    getClock,
    setCoordinates,
    getCoordinates,
    distanceToOrigin,
    getNeighbors,

    rotateClockwise,
    rotateWiddershins,
    setRotation,
    getRotation,

    getEdges,
    addSegment,
    getSegmentIDs,
    getSegments,
    getSegmentWithExit,
    resetSegments,
    getFeatures,

    toString,
    pack,
  });

  buildClock();
  buildSegments();
  determineEdges();

  TileDataStore.store($self);

  return $self;
}
