describe('MinionRoster', function() {

  beforeEach(function() {
    MinionRoster.reset();
  });

  it('Registers a lair', function() {
    MinionRoster.registerLair(1,'goblin',4);
    MinionRoster.summonMinion(1);
    MinionRoster.summonMinion(1);

    const map = MinionRoster.getMinionMap();
    expect(map.goblin.max).to.equal(4);
    expect(map.goblin.summoned).to.equal(2);
    expect(map.goblin.assigned).to.equal(0);
  });

  it('Assigns minions', function() {
    MinionRoster.registerLair(7,'goblin',4);
    MinionRoster.summonMinion(7);
    MinionRoster.assignMinion(10,'miner-0','goblin');

    const status = MinionRoster.getMinionMap().goblin;
    expect(status.summoned).to.equal(1);
    expect(status.assigned).to.equal(1);

    const assignments = MinionRoster.getAssignments(10);
    expect(assignments['miner-0']).to.equal('goblin');
  });

});
