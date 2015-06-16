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
    return this.spareRollScore(rolls, rollIndex) + this.nextRollScore(rolls, rollIndex + 1)
  } else if (roll === 'X') {
    return this.STRIKE_SCORE + this.nextTwoRollsScore(rolls, rollIndex)
  } else {
    return roll
  }
}

ScoreCalculator.prototype.spareRollScore = function (rolls, rollIndex) {
  return this.FRAME_MAXIMUM - rolls[rollIndex - 1]
}

ScoreCalculator.prototype.nextRollScore = function (rolls, rollIndex) {
  if (rolls[rollIndex] === 'X') {
    return this.STRIKE_SCORE
  } else if (rolls[rollIndex] === '/') {
    return this.spareRollScore(rolls, rollIndex)
  } else {
    return rolls[rollIndex]
  }
}

ScoreCalculator.prototype.nextTwoRollsScore = function (rolls, rollIndex) {
  return this.nextRollScore(rolls, rollIndex + 1) + this.nextRollScore(rolls, rollIndex + 2)
}

ScoreCalculator.prototype.sum = function (previousValue, currentValue) {
  return previousValue + currentValue
}

module.exports = ScoreCalculator
