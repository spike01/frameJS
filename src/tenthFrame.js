var Frame = require('./frame')

TenthFrame.prototype = new Frame()

TenthFrame.prototype.constructor = TenthFrame

function TenthFrame () {
  this.rolls = []
}

TenthFrame.prototype.score = function () {
  if (this.isSpare()) {
    return [this.rolls[0], '/', this.rolls[2]]
  }
  return this.rolls
}

TenthFrame.prototype.isOver = function () {
  if (this.hasNoBonus()) {
    return this.rolls.length === 2
  }
  return this.rolls.length === 3
}

TenthFrame.prototype.hasNoBonus = function () {
  return this.frameTotal() < 10 && this.rolls.length === 2
}

module.exports = TenthFrame
