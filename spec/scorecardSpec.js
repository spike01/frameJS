describe("Scorecard", function() {
  var Scorecard = require('../src/scorecard.js');
  var scorecard

  beforeEach(function() {
    scorecard = new Scorecard();
  });

  it("starts with no frames", function() {
    expect(scorecard.frames).toEqual([]);
  });

  it("starts at the first frame", function() {
    expect(scorecard.frameIndex).toEqual(0);
  });

  it("can add a roll", function() {
    scorecard.addRoll(0)
    expect(scorecard.currentFrame).toEqual([0]);
  });

  it("moves forward a frame after two rolls", function() {
    addFrame(0,0)
    expect(scorecard.frameIndex).toEqual(1);
  });

  it("adds a completed frame", function() {
    addFrame(0,0);
    expect(scorecard.frames).toEqual([[0,0]])
  });

  it("adds rolls to the correct frame", function() {
    addFrame(0,0)
    addFrame(0,0)
    expect(scorecard.frames).toEqual([[0,0],[0,0]]);
  });

  it("scores a gutter game", function() {
    for(var i = 0; i < 10; i++) {
      addFrame(0,0)
    }
    expect(scorecard.score()).toEqual(0)
  });

  it("scores a game of ones", function() {
    for(var i = 0; i < 10; i++) {
      addFrame(1,1)
    }
    expect(scorecard.score()).toEqual(20)
  });

  it("scores a spare", function() {
    addFrame(5, 5);
    addFrame(9, 0);
    for(var i = 0; i < 8; i++) {
      addFrame(0,0)
    }
    expect(scorecard.score()).toEqual(28)
  });
  
  it("scores a strike", function() {
    addFrame(10, 0);
    addFrame(3, 4);
    for(var i = 0; i < 8; i++) {
      addFrame(0,0)
    }
    expect(scorecard.score()).toEqual(24)
  });

  function addFrame(roll1, roll2) {
    scorecard.addRoll(roll1);
    scorecard.addRoll(roll2);
  }
});
