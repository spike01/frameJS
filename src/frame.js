function Frame() {
  this.rolls = []
}

Frame.prototype.addRoll = function(roll) {
  this.rolls.push(roll);
}

Frame.prototype.isOver = function() {
  return this.rolls[0] == 10 || this.rolls.length == 2;
}

Frame.prototype.isSpare = function() {
  return this.isOver() && this.rolls[0] + this.rolls[1] == 10;
}

Frame.prototype.isStrike = function() {
  return this.rolls[0] == 10;
}

Frame.prototype.score = function() {
  return this.rolls.reduce(add);
}

Frame.prototype.spareBonus = function() {
  return this.rolls[0]
}

Frame.prototype.strikeBonus = function() {
  return this.score();
}

function add(a, b) {
  return a + b 
}

module.exports = Frame
