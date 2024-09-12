describe('GuardianBuilder', function() {

  describe('build()', function() {
    it('creates with species alone', function() {
      const guardian = GuardianBuilder.build({ species:'goblin' });

      expect(guardian.getID()).to.be.above(0);
      expect(guardian.getSpecies().getName()).to.equal('Goblin');
      expect(guardian.getGender()).to.be.oneOf(['male','female','futa']);
      expect(guardian.getFullName().length).to.be.above(3);
    });
  });

});

