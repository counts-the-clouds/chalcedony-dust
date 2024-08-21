describe("Room", function() {

  describe("HasItems", function() {
    it('adds an item to the inventory', function() {
      const room = Room({ code:'blacksmith' });
      const iron = Item({ code:'iron-ore' });

      room.addItem(iron);

      expect(room.getItems().length).to.equal(1);
      expect(room.getItems()[0].getID()).to.equal(iron.getID());
    });

    it('deletes an item from the inventory', function() {
      const room = Room({ code:'blacksmith' });
      const iron = Item({ code:'iron-ore' });

      room.addItem(iron);
      room.deleteItem(iron)

      expect(room.getItems().length).to.equal(0);
    });
  });

})