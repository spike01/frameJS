describe('Scorecard', function () {
  var scorecard

  beforeEach(function () {
    scorecard = new Scorecard(Frame, TenthFrame, ScoreCalculator)
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
    var frame = new Frame()
    frame.addRoll(0)
    frame.addRoll(0)
    addFrame(0, 0)
    expect(scorecard.frames).toEqual([frame])
  })

  it('adds rolls to the correct frame', function () {
    var frame = new Frame()
    frame.addRoll(0)
    frame.addRoll(0)
    var frame2 = new Frame()
    frame2.addRoll(0)
    frame2.addRoll(0)
    addFrame(0, 0)
    addFrame(0, 0)
    expect(scorecard.frames).toEqual([frame, frame2])
  })

  it('adds a tenth frame', function () {
    var tenthFrame = new TenthFrame()
    tenthFrame.addRoll(6)
    tenthFrame.addRoll(0)
    for (var i = 0; i < 9; i++) {
      addFrame(6, 2)
    }
    addFrame(6, 0)
    expect(scorecard.frames[9]).toEqual(tenthFrame)
  })

  it('stops after 10 frames', function () {
    for (var i = 0; i < 10; i++) {
      addFrame(0, 0)
    }
    expect(scorecard.addRoll(0)).toEqual('Game over')
  })

  function addFrame (roll1, roll2) {
    scorecard.addRoll(roll1)
    scorecard.addRoll(roll2)
  }
})
