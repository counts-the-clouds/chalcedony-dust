describe("Room", function() {

  describe("Lair Rooms", function() {
    it('is a lair', function() {
      const feature = Feature({ type:TileType.room });
      feature.attachConstruction('lair-goblin');

      const room = feature.getConstruction();
      expect(room.isLair()).to.be.true;
      expect(room.getDomiciledMinionCount()).to.equal(0);
      expect(room.getLairData().species).to.equal('goblin');
    });

    it('can add minions', function() {
      const feature = Feature({ type:TileType.room });
      feature.addSegment(Tile({ code:'baseline-r1-0' }).getSegments()[0]);
      feature.addSegment(Tile({ code:'baseline-r1-1' }).getSegments()[0]);
      feature.attachConstruction('lair-kobold');

      const room = feature.getConstruction();
      const minion = MinionBuilder.build({ species:'kobold' });

      room.addMinion(minion);

      expect(room.getDomiciledMinions()).to.have.members([minion.getID()]);
      expect(room.pack().isLair.minions).to.have.members([minion.getID()]);
    });
  });

})