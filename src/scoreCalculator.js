function ScoreCalculator (frames) {
  this.frames = frames
  this.STRIKE_SCORE = 10
  this.FRAME_MAXIMUM = 10
}

ScoreCalculator.prototype.score = function () {
  return this.frames.map(this.frameScores)
    .reduce(this.flattenArray)
    .map(this.calculateScores, this)
    .reduce(this.sum)
}

ScoreCalculator.prototype.frameScores = function (frame) {
  return frame.score()
}

ScoreCalculator.prototype.flattenArray = function (previousValue, currentValue) {
  return previousValue.concat(currentValue)
}

ScoreCalculator.prototype.calculateScores = function (roll, rollIndex, rolls) {
  if (roll === '/') {
    return this.frameTotal(rolls, rollIndex) + this.nextRoll(rolls, rollIndex)
  } else if (roll === 'X') {
    return this.STRIKE_SCORE + this.nextTwoRolls(rolls, rollIndex)
  } else {
    return roll
  }
}

ScoreCalculator.prototype.frameTotal = function (rolls, rollIndex) {
  return this.FRAME_MAXIMUM - rolls[rollIndex - 1]
}

ScoreCalculator.prototype.nextRoll = function (rolls, rollIndex) {
  if (rolls[rollIndex + 1] === 'X') {
    return this.STRIKE_SCORE
  } else {
    return rolls[rollIndex + 1]
  }
}

ScoreCalculator.prototype.nextTwoRolls = function (rolls, rollIndex) {
  return this.nextRoll(rolls, rollIndex) + this.nextRoll(rolls, rollIndex + 1)
}

ScoreCalculator.prototype.sum = function (previousValue, currentValue) {
  return previousValue + currentValue
}

module.exports = ScoreCalculator
