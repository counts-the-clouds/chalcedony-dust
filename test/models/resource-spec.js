describe('Resource', function() {

  it('has workers', function() {
    const minion = MinionBuilder.build({ species:'skreevin' });

    const feature = Feature({ type:TileType.resource });
    feature.attachConstruction('amberian-mine');

    const resource = feature.getConstruction();
    resource.setWorker(0,minion);

    expect(resource.getSlotCount()).to.equal(1);
    expect(resource.getWorkerMap()[0]).to.equal(minion.getID());
  });

})