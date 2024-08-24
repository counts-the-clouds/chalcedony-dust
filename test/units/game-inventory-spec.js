describe("GameInventory",function() {

  beforeEach(function() {
    GameInventory.reset();
  })

  describe('addItem()', function() {
    it("can't add items when there is no storage", function() {
      expect(() => {
        GameInventory.addItem('iron-ingot',1);
      }).to.throw(/no free storage/);
    });

    it('adds an item', function() {
      GameInventory.addStorage(1);
      GameInventory.addItem('iron-ingot',1);
      expect(GameInventory.getItemCount('iron-ingot')).to.equal(1);
      expect(GameInventory.getFreeStorage()).to.equal(0);
    });
  });

  describe('removeItem()', function() {
    it("can't remove items what aren't there", function() {
      expect(() => {
        GameInventory.removeItem('iron-ingot',1);
      }).to.throw(/not in inventory/);
    });

    it("can't remove more than there is.", function() {
      GameInventory.addStorage(8);
      GameInventory.addItem('iron-ingot',5);

      expect(() => {
        GameInventory.removeItem('iron-ingot',10);
      }).to.throw(/not enough/);
    });

    it('removes an item', function() {
      GameInventory.addStorage(2);
      GameInventory.addItem('iron-ingot',5);
      GameInventory.removeItem('iron-ingot',3);

      expect(GameInventory.getItemCount('iron-ingot')).to.equal(2);
      expect(GameInventory.getFreeStorage()).to.equal(1);
    });

    it('completely removes an item when there are 0 left', function() {
      GameInventory.addStorage(2);
      GameInventory.addItem('iron-ingot',5);
      GameInventory.removeItem('iron-ingot',5);

      expect(GameInventory.getItemCount('iron-ingot')).to.equal(0);
      expect(GameInventory.getFreeStorage()).to.equal(2);
    });
  });

});
