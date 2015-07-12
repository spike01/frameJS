describe('when scoring games', function () {
  var scorecalculator
  var frames

  beforeEach(function () {
    frames = []
  })

  it('scores a gutter game', function () {
    for (var i = 0; i < 10; i++) {
      addFrame(0, 0)
    }
    scoreCalculator = new ScoreCalculator(frames)
    expect(scoreCalculator.score()).toEqual(0)
  })

  it('scores a game of ones', function () {
    for (var i = 0; i < 10; i++) {
      addFrame(1, 1)
    }
    scoreCalculator = new ScoreCalculator(frames)
    expect(scoreCalculator.score()).toEqual(20)
  })

  it('scores a spare', function () {
    addSpare()
    addFrame(9, 0)
    for (var i = 0; i < 8; i++) {
      addFrame(0, 0)
    }
    scoreCalculator = new ScoreCalculator(frames)
    expect(scoreCalculator.score()).toEqual(28)
  })

  it('scores a strike', function () {
    addStrike()
    addFrame(3, 4)
    for (var i = 0; i < 8; i++) {
      addFrame(0, 0)
    }
    scoreCalculator = new ScoreCalculator(frames)
    expect(scoreCalculator.score()).toEqual(24)
  })

  it('scores two strikes', function () {
    addStrike()
    addStrike()
    addFrame(3, 4)
    for (var i = 0; i < 7; i++) {
      addFrame(0, 0)
    }
    scoreCalculator = new ScoreCalculator(frames)
    expect(scoreCalculator.score()).toEqual(47)
  })

  it('scores three strikes', function () {
    addStrike()
    addStrike()
    addStrike()
    addFrame(3, 4)
    for (var i = 0; i < 6; i++) {
      addFrame(0, 0)
    }
    scoreCalculator = new ScoreCalculator(frames)
    expect(scoreCalculator.score()).toEqual(77)
  })

  it('scores ten strikes', function () {
    for (var i = 0; i < 9; i++) {
      addStrike()
    }
    addTenthFrame(10, 1, 1)
    scoreCalculator = new ScoreCalculator(frames)
    expect(scoreCalculator.score()).toEqual(273)
  })

  it('scores a game up to the ninth frame with a strike at the start', function () {
    addStrike()
    for (var i = 0; i < 8; i++) {
      addFrame(3, 4)
    }
    scoreCalculator = new ScoreCalculator(frames)
    expect(scoreCalculator.score()).toEqual(73)
  })

  it('scores a full game with a mix of spares and strikes', function () {
    addStrike()
    addSpare()
    for (var i = 0; i < 8; i++) {
      addFrame(3, 4)
    }
    scoreCalculator = new ScoreCalculator(frames)
    expect(scoreCalculator.score()).toEqual(89)
  })

  it('scores a perfect game', function () {
    for (var i = 0; i < 9; i++) {
      addStrike()
    }
    addTenthFrame(10, 10, 10)
    scoreCalculator = new ScoreCalculator(frames)
    expect(scoreCalculator.score()).toEqual(300)
  })

  function addFrame(roll1, roll2) {
    frames.push({score: function () {
      return [roll1, roll2]
    }})
  }

  function addStrike() {
    frames.push({score: function () {
      return ['X']
    }})
  }

  function addSpare() {
    frames.push({score: function () {
      return [5, '/']
    }})
  }

  function addTenthFrame(roll1, roll2, roll3) {
    frames.push({score: function () { 
      return [roll1, roll2, roll3]
    }})
  }
})

