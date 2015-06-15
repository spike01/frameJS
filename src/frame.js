function Frame () {
  this.rolls = []
}

Frame.prototype.score = function () {
  if (this.isStrike()) {
    return ['X']
  } else if (this.isSpare()) {
    return [this.rolls[0], '/']
  } else {
    return this.rolls
  }
}

Frame.prototype.addRoll = function (roll) {
  this.rolls.push(roll)
}

Frame.prototype.isOver = function () {
  return this.isStrike() || this.rolls.length === 2
}

Frame.prototype.isSpare = function () {
  return this.isOver() && this.frameTotal() === 10
}

Frame.prototype.frameTotal = function () {
  return this.rolls[0] + this.rolls[1]
}

Frame.prototype.isStrike = function () {
  return this.rolls[0] === 10
}

module.exports = Frame
