describe('Feature',function() {

  describe('addSegment()', function() {
    it ('adds the tile segment', function() {
      const tile = Tile({ code:'baseline-h2-0' });
      const segment = tile.getSegments()[0];
      const feature = Feature({});
            feature.addSegment(segment);

      expect(feature.pack().segments[0]).to.equal(segment.getID());
    });
  });
  
})