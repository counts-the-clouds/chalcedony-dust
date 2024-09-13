describe('AdventurerBuilder', function() {

  describe('build()', function() {
    it('creates with species alone', function() {
      const adventurer = AdventurerBuilder.build({ species:'lunar-elf' });

      expect(adventurer.getID()).to.be.above(0);
      expect(adventurer.getSpecies().getName()).to.equal('Lunar Elf');
      expect(adventurer.getGender()).to.be.oneOf(['male','female','futa']);
      expect(adventurer.getFullName().length).to.be.above(3);
    });
  });

});

