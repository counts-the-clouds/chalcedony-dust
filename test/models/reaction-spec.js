describe('Reaction', function() {

  before(function() {
    TriggerRegistry.register('test.trigger',{
      triggerFunction: data => { GameFlags.set('test.trigger', (data.value || true)) }
    });
  });

  after(function() {
    TriggerRegistry.unregister('test.trigger');
  })

  describe('trigger()', function() {
    it('triggers without conditions', function() {
      Reaction({ eventType:EventType.tilePlaced, triggerCode:'test.trigger' });
      Panopticon.induce(EventType.tilePlaced, { value:'fnord' });
      expect(GameFlags.get('test.trigger')).to.equal('fnord')
    });

    it('triggers when conditions are met', function() {
      const tile = Tile({ code:'baseline-h1-n1-0' });
      const segment = tile.getSegments()[1];
      const feature = Feature({ state:_complete });
            feature.addSegment(segment);

      Reaction({ eventType:EventType.featureCompleted, triggerCode:'test.trigger', conditions:[Condition.featureTypeIs(_node)] });

      Panopticon.induce(EventType.featureCompleted, { feature:feature, value:'fnord' });
      expect(GameFlags.get('test.trigger')).to.equal('fnord')
    });
  });
});
