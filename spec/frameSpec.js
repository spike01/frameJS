describe("Frame", function() {
  var Frame = require('../src/frame.js');
  var frame

  beforeEach(function() {
    frame = new Frame();
  });

  it("starts empty", function() {
    expect(frame.rolls).toEqual([]);
  });

  it("adds a roll", function() {
    frame.addRoll(0)
    expect(frame.rolls).toEqual([0]);
  });

  it("adds two rolls", function() {
    frame.addRoll(0)
    frame.addRoll(0)
    expect(frame.rolls).toEqual([0, 0]);
  });

});
