describe('DiscoveryAdjuster', function() {

  it('adds a resource node to a tile', function() {
    const tile = Tile({ code:'baseline-h2-0' });
    const discovery = { code:'iron-mine', type:_discoverResource };

    DiscoveryAdjuster.adjustTile(tile, discovery);

    const segment = tile.getSegments()[1];
    const feature = tile.getFeatures()[0];

    expect(segment.getType()).to.equal(_resource);
    expect(feature.getState()).to.equal(_complete);
  });

});