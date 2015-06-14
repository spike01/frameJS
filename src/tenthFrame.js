var Frame = require('./frame')

TenthFrame.prototype = new Frame()

TenthFrame.prototype.constructor = TenthFrame

function TenthFrame () {
  this.rolls = []
}

TenthFrame.prototype.score = function () {
  if (this.isStrike()) {
    return this.rolls
  } else if (this.isSpare()) {
    return [this.rolls[0], '/', this.rolls[2]]
  } else {
    return this.rolls
  }
}

TenthFrame.prototype.isOver = function () {
  if (this.frameTotal() < 10 && this.rolls.length === 2) {
    return true 
  }
  return this.rolls.length === 3 
}

module.exports = TenthFrame
