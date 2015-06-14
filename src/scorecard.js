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

  return this.frames.map(function(frame) {
    return frame.score()
  }).reduce(function(total, nextFrame) {
    return total.concat(nextFrame);
  }).map(function(roll, index, rolls) {
    if (roll == '/') {
      return frameTotal(rolls, index) + nextRoll(rolls, index);
    } else if (roll == 'X') {
      return 10 + nextTwoRolls(rolls, index)
    } else {
      return roll;
    }
  }).reduce(function(total, nextRoll) {
    return total + nextRoll;
  })

  function frameTotal(rolls, index) {
    return 10 - rolls[index - 1];
  }

  function nextRoll(rolls, index) {
    if (rolls[index + 1] == 'X') {
      return 10;
    } else {
      return rolls[index + 1];
    }
  }

  function nextTwoRolls(rolls, index) {
    return nextRoll(rolls, index) + nextRoll(rolls, index + 1);
  }
}

Scorecard.prototype.nextFrame = function() {
  this.frames.push(this.currentFrame);
  this.currentFrame = new this.frame();
  this.frameIndex++;
}

module.exports = Scorecard;
