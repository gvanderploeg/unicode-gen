

describe("Random number generator", function() {
  var a;

  it("should work for min=0 and max=0", function() {

    var result = unicodeGen.random(0, 0);

    expect(result).toBe(0);
  });

  it("should work for min=0 and max=1", function() {
    var result = unicodeGen.random(0, 1);
    jasmine.log("result: " + result);

    expect(result).toBeGreaterThan(-1);
    expect(result).toBeLessThan(1);
  });
  it("should do a somewhat equal distribution, given p is large enough", function() {
    var results = {};
    for (var i = 0; i<1000; i++) {
      var result = unicodeGen.random(0, 10);
      if (results[result])
        results[result]++;
      else
        results[result] = 1;
    }
    for (var j = 0; j < 10; i++) {
      var times = results[j];
      jasmine.log("Number ", j, " was generated ", times, " times");
      j++;
      expect(times).toBeGreaterThan(0);
    }
  });

});

