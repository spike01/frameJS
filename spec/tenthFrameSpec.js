describe('Tenth Frame', function () {
  var frame

  beforeEach(function () {
    frame = new TenthFrame()
  })

  it('is over after two normal rolls', function () {
    frame.addRoll(0)
    frame.addRoll(0)
    expect(frame.isOver()).toBe(true)
  })

  it('is not over after a spare', function () {
    frame.addRoll(9)
    frame.addRoll(1)
    expect(frame.isOver()).toBe(false)
  })

  it('is over after a spare and a bonus ball', function () {
    frame.addRoll(9)
    frame.addRoll(1)
    frame.addRoll(2)
    expect(frame.isOver()).toBe(true)
  })

  it('is not over after a strike', function () {
    frame.addRoll(10)
    expect(frame.isOver()).toBe(false)
  })

  it('is over after a strike and two bonus ball', function () {
    frame.addRoll(10)
    frame.addRoll(3)
    frame.addRoll(2)
    expect(frame.isOver()).toBe(true)
  })

  describe('when reporting score', function () {

    it('reports normal frames', function () {
      frame.addRoll(5)
      frame.addRoll(3)
      expect(frame.score()).toEqual([5, 3])
    })

    it('reports spare and bonus roll', function () {
      frame.addRoll(5)
      frame.addRoll(5)
      frame.addRoll(5)
      expect(frame.score()).toEqual([5, '/', 5])
    })

    it('reports strike and bonus rolls', function () {
      frame.addRoll(10)
      frame.addRoll(10)
      frame.addRoll(10)
      expect(frame.score()).toEqual([10, 10, 10])
    })
  })
})
