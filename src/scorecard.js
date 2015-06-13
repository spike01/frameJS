var Frame = require('./frame')

function Scorecard(Frame) {
  this.frames = [];
  this.frameIndex = 0;
  this.frame = Frame;
  this.currentFrame = new this.frame();
}

Scorecard.prototype.addRoll = function(roll) {
  this.currentFrame.addRoll(roll);
  if (this.currentFrame.isOver()) {
    this.nextFrame()
  };
}

Scorecard.prototype.score = function() {
  var score = 0

  for(var frameIndex = 0; frameIndex < this.frames.length; frameIndex++) {
    if (this.frames[frameIndex].isStrike()) {
      if (this.frames[frameIndex + 1].isStrike()) {
      score += this.frames[frameIndex + 2].spareBonus();
      }
      score += this.frames[frameIndex + 1].strikeBonus();
    } else if (this.frames[frameIndex].isSpare()) {
      score += this.frames[frameIndex + 1].spareBonus();
    }
    score += this.frames[frameIndex].score()
  }
  return score;
}

Scorecard.prototype.nextFrame = function() {
  this.frames.push(this.currentFrame);
  this.currentFrame = new this.frame();
  this.frameIndex++;
}

module.exports = Scorecard;
