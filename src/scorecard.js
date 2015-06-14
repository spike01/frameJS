var Frame = require('./frame')
var TenthFrame = require('./tenthFrame')

function Scorecard (Frame) {
  this.frames = []
  this.frame = Frame
  this.tenthFrame = TenthFrame
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
  return this.frames.map(function (frame) {
    return frame.score()
  }).reduce(function (total, nextFrame) {
    return total.concat(nextFrame)
  }).map(function (roll, index, rolls) {
    if (roll === '/') {
      return frameTotal(rolls, index) + nextRoll(rolls, index)
    } else if (roll === 'X') {
      return 10 + nextTwoRolls(rolls, index)
    } else {
      return roll
    }
  }).reduce(function (total, nextRoll) {
    return total + nextRoll
  })

  function frameTotal (rolls, index) {
    return 10 - rolls[index - 1]
  }

  function nextRoll (rolls, index) {
    if (rolls[index + 1] === 'X') {
      return 10
    } else {
      return rolls[index + 1]
    }
  }

  function nextTwoRolls (rolls, index) {
    return nextRoll(rolls, index) + nextRoll(rolls, index + 1)
  }
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
