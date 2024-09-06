describe('MinionBuilder', function() {

  describe('build()', function() {
    it('creates with species alone', function() {
      const minion = MinionBuilder.build({ species:'goblin' });

      expect(minion.getID()).to.be.above(0);
      expect(minion.getSpecies().getName()).to.equal('Goblin');
      expect(minion.getGender()).to.be.oneOf(['male','female','futa']);
      expect(minion.getFullName().length).to.be.above(3);
    });
  });

});

