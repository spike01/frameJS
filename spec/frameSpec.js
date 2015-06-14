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
    frame.addRoll(0);
    expect(frame.rolls).toEqual([0]);
  });

  it("adds two rolls", function() {
    frame.addRoll(0);
    frame.addRoll(0);
    expect(frame.rolls).toEqual([0, 0]);
  });

  it("is over after two rolls", function() {
    frame.addRoll(0);
    frame.addRoll(0);
    expect(frame.isOver()).toBe(true);
  });

  it("registers a spare", function() {
    frame.addRoll(5);
    frame.addRoll(5);
    expect(frame.isSpare()).toBe(true);
  });

  it("registers a strike", function() {
    frame.addRoll(10);
    expect(frame.isStrike()).toBe(true);
  });

  it("is over after a strike", function() {
    frame.addRoll(10);
    expect(frame.isOver()).toBe(true);
  });

  describe("when reporting score", function() {

    it("reports strikes", function() {
      frame.addRoll(10);
      expect(frame.score()).toEqual(["X"]);
    });

    it("reports spares", function() {
      frame.addRoll(5);
      frame.addRoll(5);
      expect(frame.score()).toEqual([5, "/"]);
    });

    it("reports normal frames", function() {
      frame.addRoll(5);
      frame.addRoll(3);
      expect(frame.score()).toEqual([5, 3]);
    });
  })
});
