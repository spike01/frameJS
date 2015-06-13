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

Scorecard.prototype.isEndOfFrame = function() {
  return this.currentFrame.length == 2;
}

Scorecard.prototype.nextFrame = function() {
  this.frames.push(this.currentFrame);
  this.currentFrame = []
  this.frameIndex++
}

Scorecard.prototype.score = function() {
  var score = 0
  this.frames.forEach(function(frame) {
    score += frame[0] + frame[1];
  })
  return score;
}

module.exports = Scorecard
