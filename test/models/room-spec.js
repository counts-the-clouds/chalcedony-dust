describe.only("Room", function() {

  describe("Lair Rooms", function() {

    it('is a lair', function() {
      const feature = Feature({ type:TileType.room });
      feature.attachConstruction('lair-goblin');

      const room = feature.getConstruction();
      expect(room.getRoomType()).to.equal(RoomType.lair);
      expect(room.getDomiciledMinionCount()).to.equal(0);
      expect(room.getLairData().species).to.equal('goblin');
    });

  });

})