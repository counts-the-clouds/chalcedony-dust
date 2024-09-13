describe('GuardianNode', function() {

  it('randomly picks guardians from the available guardians', function() {
    expect(GuardianNode({}).getGuardianChoices().length).to.equal(2);
  });

  it("won't pick a guardian that has already been offered", function() {
    const guardians_a = GuardianNode({}).getGuardianChoices();
    const guardians_b = GuardianNode({}).getGuardianChoices();
    const guardians_c = GuardianNode({}).getGuardianChoices();

    expect(guardians_a.includes(guardians_b[0])).to.be.false;
    expect(guardians_a.includes(guardians_c[0])).to.be.false;
    expect(guardians_b.includes(guardians_a[0])).to.be.false;
    expect(guardians_b.includes(guardians_c[0])).to.be.false;
    expect(guardians_c.includes(guardians_a[0])).to.be.false;
    expect(guardians_c.includes(guardians_b[0])).to.be.false;
  });

});
