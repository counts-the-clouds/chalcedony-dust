describe('MinionRoster', function() {

  beforeEach(function() {
    MinionRoster.reset();
  });

  it('Registers a lair', function() {
    MinionRoster.registerLair(1,'goblin',4);

    const map = MinionRoster.getMinionMap();
    expect(map.goblin.count).to.equal(4);
    expect(map.goblin.assigned).to.equal(0);
  });

  it('Assigns minions', function() {
    MinionRoster.registerLair(7,'goblin',4);
    MinionRoster.assignMinion(10,'miner-0','goblin');

    const status = MinionRoster.getMinionMap().goblin;
    expect(status.count).to.equal(4);
    expect(status.assigned).to.equal(1);

    const assignments = MinionRoster.getAssignments(10);
    expect(assignments['miner-0']).to.equal('goblin');
  });

});
