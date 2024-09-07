describe('Resource', function() {

  it('has workers', function() {
    const minion = MinionBuilder.build({ species:'skreevin' });

    const feature = Feature({ type:TileType.resource });
    feature.attachConstruction('amberian-mine');

    const resource = feature.getConstruction();
    resource.addWorker(minion);

    expect(resource.getSlotCount()).to.equal(1);
    expect(resource.getWorkerCount()).to.equal(1);
    expect(resource.hasWorker(minion)).to.be.true;
    expect(resource.getWorkerIDs()[0]).to.equal(minion.getID());
  });

})