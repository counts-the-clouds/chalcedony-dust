describe("Guardian", function() {

  describe("IsActor", function() {
    it('sets actor properties from guardian data', function() {
      const guardian = Guardian({ code:'renna' });

      expect(guardian.getFullName()).to.equal('Renna Howlthrust');
      expect(guardian.getGender()).to.equal(Gender.futa);
      expect(guardian.getSpecies().getName()).to.equal('Satyr');
    });
  });

  describe('HasAspects', function() {
    it('adds aspects', function() {
      const guardian = Guardian({ code:'azalon' });
      guardian.setAspect('mining',2);
      expect(guardian.getAspect('mining').getLevel()).to.equal(2);
    });
  });

});
