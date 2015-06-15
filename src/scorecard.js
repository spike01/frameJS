function Scorecard (Frame, TenthFrame, ScoreCalculator) {
  this.frames = []
  this.frame = Frame
  this.tenthFrame = TenthFrame
  this.scoreCalculator = ScoreCalculator
  this.currentFrame = new this.frame()
}

Scorecard.prototype.addRoll = function (roll) {
  if (this.frames.length === 10) {
    return 'Game over'
  }
  this.currentFrame.addRoll(roll)
  if (this.currentFrame.isOver()) {
    this.nextFrame()
  }
}

Scorecard.prototype.score = function () {
  var calculator = new this.scoreCalculator(this.frames)
  return calculator.score()
}

Scorecard.prototype.nextFrame = function () {
  this.frames.push(this.currentFrame)
  if (this.frames.length === 9) {
    this.currentFrame = new this.tenthFrame()
  } else {
    this.currentFrame = new this.frame()
  }
}

module.exports = Scorecard
