global.Tile = function(data) {

  const $code = data.code;
  const $id = data.id || TileDataStore.nextID();

  let $coordinates = data.coordinates;
  let $rotation = data.rotation || 0;
  let $edges = data.edges;
  let $extra = data.extra || {};

  // When built, segments will either be an array of segment indices or an
  // array of objects that can be used to build the segments.
  let $segments = data.segments;

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

  function hasNode() {
    return hasSegmentOfType(TileType.node);
  }

  function hasSegmentOfType(type) {
    for (const id of $segments) {
      if (SegmentDataStore.get(id).getType() === type) { return true }
    }
    return false;
  }

  // === Serialization ===

  function toString() {
    return `Tile:${$id}[${$code}]`
  }

  function pack() {
    return {
      code: $code,
      id: $id,

      coordinates: $coordinates,
      rotation: $rotation,
      edges: $edges,
      segments: $segments,
      extra: $extra,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
    model: 'Tile',
    getCode,
    getID,
    getDrawNote,
    getDrawTrigger,
    getPlacementEvent,
    getPlacementTrigger,
    getPlacementRules,
    getPlacementNote,
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
    hasNode,
    hasSegmentOfType,

    toString,
    pack,
  });

  buildSegments();
  determineEdges();

  TileDataStore.store($self);

  return $self;
}
