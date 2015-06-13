function Scorecard() {
  this.frames = [];
  this.frameIndex = 0;
  this.currentFrame = []
}

Scorecard.prototype.addRoll = function(roll) {
  this.currentFrame.push(roll);
  if (this.isEndOfFrame()) {
    this.nextFrame()
  };
}

Scorecard.prototype.score = function() {
  var score = 0
  for(var frameIndex = 0; frameIndex < this.frames.length; frameIndex++) {
    if (this.isStrike(frameIndex)) {
      score += this.nextTwoRollsScore(frameIndex);
    } else if (this.isSpare(frameIndex)) {
      score += this.nextRollScore(frameIndex);
    }
    score += this.frameScore(frameIndex);
  }
  return score;
}

Scorecard.prototype.isEndOfFrame = function() {
  return this.currentFrame.length == 2;
}

Scorecard.prototype.nextFrame = function() {
  this.frames.push(this.currentFrame);
  this.currentFrame = []
  this.frameIndex++
}

Scorecard.prototype.isStrike = function(frameIndex) {
  return this.frames[frameIndex][0] == 10 && this.frameScore(frameIndex) == 10;
}

Scorecard.prototype.isSpare = function(frameIndex) {
  return this.frameScore(frameIndex) == 10;
}

Scorecard.prototype.frameScore = function(frameIndex) {
  return this.frames[frameIndex][0] + this.frames[frameIndex][1];
}

Scorecard.prototype.nextRollScore = function(frameIndex) {
  return this.frames[frameIndex + 1][0];
}

Scorecard.prototype.nextTwoRollsScore = function(frameIndex) {
  return this.frames[frameIndex + 1][0] + this.frames[frameIndex + 1][1];
}
module.exports = Scorecard
