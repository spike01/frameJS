describe('Scorecard', function () {
  var Scorecard = require('../src/scorecard.js')
  var Frame = require('../src/frame.js')
  var scorecard

  beforeEach(function () {
    scorecard = new Scorecard(Frame)
  })

  it('starts with no frames', function () {
    expect(scorecard.frames).toEqual([])
  })

  it('adds a roll', function () {
    scorecard.addRoll(0)
    var frame = new Frame()
    frame.addRoll(0)
    expect(scorecard.currentFrame).toEqual(frame)
  })

    it('adds a completed frame', function () {
    addFrame(0, 0)
    var frame = new Frame()
    frame.addRoll(0)
    frame.addRoll(0)
    expect(scorecard.frames).toEqual([frame])
  })

  it('adds rolls to the correct frame', function () {
    addFrame(0, 0)
    var frame = new Frame()
    frame.addRoll(0)
    frame.addRoll(0)
    addFrame(0, 0)
    var frame2 = new Frame()
    frame2.addRoll(0)
    frame2.addRoll(0)
    expect(scorecard.frames).toEqual([frame, frame2])
  })

  it('stops after 10 frames', function () {
    for (var i = 0; i < 10; i++) {
      addFrame(0, 0)
    }
    expect(scorecard.addRoll(0)).toEqual('Game over')
  })

  describe('when scoring games', function () {

    it('scores a gutter game', function () {
      for (var i = 0; i < 10; i++) {
        addFrame(0, 0)
      }
      expect(scorecard.score()).toEqual(0)
    })

    it('scores a game of ones', function () {
      for (var i = 0; i < 10; i++) {
        addFrame(1, 1)
      }
      expect(scorecard.score()).toEqual(20)
    })

    it('scores a spare', function () {
      addFrame(5, 5)
      addFrame(9, 0)
      for (var i = 0; i < 8; i++) {
        addFrame(0, 0)
      }
      expect(scorecard.score()).toEqual(28)
    })

    it('scores a strike', function () {
      scorecard.addRoll(10)
      addFrame(3, 4)
      for (var i = 0; i < 8; i++) {
        addFrame(0, 0)
      }
      expect(scorecard.score()).toEqual(24)
    })

    it('scores two strikes', function () {
      scorecard.addRoll(10)
      scorecard.addRoll(10)
      addFrame(3, 4)
      for (var i = 0; i < 7; i++) {
        addFrame(0, 0)
      }
      expect(scorecard.score()).toEqual(47)
    })

    it('scores three strikes', function () {
      scorecard.addRoll(10)
      scorecard.addRoll(10)
      scorecard.addRoll(10)
      addFrame(3, 4)
      for (var i = 0; i < 6; i++) {
        addFrame(0, 0)
      }
      expect(scorecard.score()).toEqual(77)
    })

    it('scores a game correctly up to the ninth frame', function () {
      scorecard.addRoll(10)
      addFrame(3, 4)
      addFrame(7, 2)
      addFrame(2, 8)
      addFrame(6, 3)
      addFrame(2, 0)
      addFrame(4, 6)
      addFrame(5, 4)
      addFrame(3, 4)
      expect(scorecard.score()).toEqual(91)
    })
  })

  function addFrame (roll1, roll2) {
    scorecard.addRoll(roll1)
    scorecard.addRoll(roll2)
  }
})
