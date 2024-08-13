global.DiscoveryAdjuster = (function() {

  function adjustTile(tile,discovery) {
    console.log("=== Discovery Made ===")
    console.log(tile.toString(),'->',discovery)

    if (discovery.type === _discoverResource) {
      addResourceNode(tile, discovery);
    }
  }

  // TODO: The simplest solution is to just add a resource node on top of the
  //       other segments. I need a way to mark a tile to denote that this
  //       won't work for this discovery, and rework the existing segments to
  //       make the resource node fit.
  function addResourceNode(tile, discovery) {
    const index = tile.getSegments().length;
    const graphics = { shape:'node-small' };

    const segment = Segment({ tileID:tile.getID(), type:_resource, index:index, graphics:graphics });
    const feature = Feature({ state:_complete });
    feature.addSegment(segment);
    tile.addSegment(segment);

    console.log(`TODO: Make feature a ResourceNode of type ${discovery.code}`)
  }

  return Object.freeze({
    adjustTile,
  });

})();