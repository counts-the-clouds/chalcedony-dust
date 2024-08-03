
describe("Coordinates", function() {

  describe('fromGlobal', function() {
    it("at the origin", function() {
      let coords = Coordinates.fromGlobal(0,0);
      expect(coords.cx).to.equal(0);
      expect(coords.cy).to.equal(0);
      expect(coords.ci).to.equal(0);
    });

    it("within the origin chunk", function() {
      let coords = Coordinates.fromGlobal(5,10)
      expect(coords.cx).to.equal(0);
      expect(coords.cy).to.equal(0);
      expect(coords.ci).to.equal(165); // (10*16)+5
    });

    it("within a chunk to the north", function() {
      let coords = Coordinates.fromGlobal(5,16)
      expect(coords.cx).to.equal(0);
      expect(coords.cy).to.equal(1);
      expect(coords.ci).to.equal(5);
    });

    it("within a chunk to the south", function() {
      let coords = Coordinates.fromGlobal(5,-1)
      expect(coords.cx).to.equal(0);
      expect(coords.cy).to.equal(-1);
      expect(coords.ci).to.equal(245);
    });

    it("within a chunk to the south west", function() {
      let coords = Coordinates.fromGlobal(-16,-16)
      expect(coords.cx).to.equal(-1);
      expect(coords.cy).to.equal(-1);
      expect(coords.ci).to.equal(0);
    });

    it("within a distant chunk to the south west", function() {
      let coords = Coordinates.fromGlobal(-17,-17)
      expect(coords.cx).to.equal(-2);
      expect(coords.cy).to.equal(-2);
      expect(coords.ci).to.equal(255);
    });

    it("within a distant chunk to the south east", function() {
      let coords = Coordinates.fromGlobal(33,-33)
      expect(coords.cx).to.equal(2);
      expect(coords.cy).to.equal(-3);
      expect(coords.ci).to.equal(241);
    });
  });

  describe("fromChunk()", function() {
    it("within the origin chunk", function() {
      let coords = Coordinates.fromChunk(0,0,128);
      expect(coords.gx).to.equal(0);
      expect(coords.gy).to.equal(8);
    });

    it("within a chunk to the north", function() {
      let coords = Coordinates.fromChunk(0,1,5);
      expect(coords.gx).to.equal(5);
      expect(coords.gy).to.equal(16);
    });

    it("within a chunk to the south", function() {
      let coords = Coordinates.fromChunk(0,-1,245)
      expect(coords.gx).to.equal(5);
      expect(coords.gy).to.equal(-1);
    });

    it("within a chunk to the south west", function() {
      let coords = Coordinates.fromChunk(-1,-1,0)
      expect(coords.gx).to.equal(-16);
      expect(coords.gy).to.equal(-16);
    });

    it("within a distant chunk to the south west", function() {
      let coords = Coordinates.fromChunk(-2,-2,255)
      expect(coords.gx).to.equal(-17);
      expect(coords.gy).to.equal(-17);
    });

    it("within a distant chunk to the south east", function() {
      let coords = Coordinates.fromChunk(2,-3,241)
      expect(coords.gx).to.equal(33);
      expect(coords.gy).to.equal(-33);
    });
  });
});
