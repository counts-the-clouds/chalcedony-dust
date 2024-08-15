describe('DiscoveryAdjuster', function() {

  it('adds a resource node to a tile', function() {
    const tile = Tile({ code:'baseline-h2-0' });
    const discovery = { code:'iron-mine', type:_discoverResource };

    DiscoveryAdjuster.adjustTile(tile, discovery);

    const hallN = tile.getSegments()[0];
    const hallS = tile.getSegments()[1];
    const resource = tile.getSegments()[2];
    const feature = tile.getFeatures()[0];

    expect(tile.getSegments().length).to.equal(3);
    expect(SegmentDataStore.all().length).to.equal(3);

    expect(hallN.getExits()).to.have.members([_n])
    expect(hallN.getType()).to.equal(TileType.hall);
    expect(hallN.getGraphics().shape).to.equal('hall-short');
    expect(hallN.getGraphics().rotate).to.be.undefined;

    expect(hallS.getExits()).to.have.members([_s])
    expect(hallS.getType()).to.equal(TileType.hall);
    expect(hallS.getGraphics().shape).to.equal('hall-short');
    expect(hallS.getGraphics().rotate).to.equal(2);

    expect(resource.getExits()).to.have.members([])
    expect(resource.getType()).to.equal(TileType.resource);
    expect(feature.getState()).to.equal(_complete);
  });

});