describe("Character Builder", function() {

  describe("buildMinion()", function() {
    it("names the minion", function() {
      const minion = CharacterBuilder.buildMinion({ species:'goblin', gender:'male' });
      expect(minion.getFirstName().length).to.be.above(0);
      expect(minion.getLastName().length).to.be.above(0);
    });
  });

});

// 15/54
