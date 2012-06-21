

describe("Random number generator", function() {
  var a;

  it("should work for 0 and 0", function() {

    var result = unicodeGen.random(0, 0);

    expect(result).toBe(0);
  });
});

