describe("Minion", function() {

  describe("IsActor", function() {
    it('sets name and gender', function() {
      const minion = Minion({});
      minion.setGender(Gender.futa);
      minion.setFirstName('Humungous');
      minion.setLastName('Girlcock');

      expect(minion.getFullName()).to.equal('Humungous Girlcock');
    });
  });

  describe('HasAspects', function() {
    it('adds aspects', function() {
      const minion = Minion({});
      minion.addAspect(Aspect({ code:'mining', level:2 }));

      expect(minion.getAspectMap().mining).to.equal(2);
    });
  });

});
