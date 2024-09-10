describe("Guardian", function() {

  describe("IsActor", function() {
    it('sets name and gender', function() {
      const guardian = Guardian({});
      guardian.setGender(Gender.futa);
      guardian.setFirstName('Humungous');
      guardian.setLastName('Girlcock');

      expect(guardian.getFullName()).to.equal('Humungous Girlcock');
    });
  });

  describe('HasAspects', function() {
    it('adds aspects', function() {
      const guardian = Guardian({});
      guardian.addAspect(Aspect({ code:'mining', level:2 }));

      expect(guardian.getAspectMap().mining).to.equal(2);
    });
  });

});
