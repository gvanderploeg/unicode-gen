
var unicodeGen = (function() {

  var mapping = {
    'a':[ 'e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'ff41'],
    'b': ['ff42'],
    'c': ['ff43'],
    'd':['13e7', 'ff44'],
    'e': [ 'e8', 'e9', 'ea', 'eb' , 'ff45'],
    'f': ['ff46'],
    'g': ['ff47'],
    'h': ['ff48'],
    'i': [ 'ec', 'ed', 'ef', 'ff49'],
    'j': ['ff4a'],
    'k': ['ff4b'],
    'l': ['ff4c'],
    'm': ['ff4d'],
    'n': ['ff4e'],
    'o': [ 'f2', 'ff4f' ],
    'p': ['ff50'],
    'q': ['ff51'],
    'r': ['ff52'],
    's': ['ff53'],
    't': ['ff54'],
    'u': ['f9', 'fa', 'fb', 'fc', 'ff55'],
    'v': ['ff56'],
    'w': ['ff57'],
    'x': ['ff58'],
    'y': ['ff59'],
    'z': ['ff5a']
  };
  var RADIX_HEX = 16;


  var getSubstitute = function (character) {
    if (mapping[character]) {
      var listOfReplacements = mapping[character];
      var whichOne = unicodeGen.random(0, listOfReplacements.length);

      return String.fromCharCode(parseInt(listOfReplacements[whichOne], RADIX_HEX));
    }
    return character;
  };

  return {
    /**
     * Random integer between given min (including) and max (excluding)
     * @param min minimal integer (including)
     * @param max maximum integer (excluding
     * @return {Number}
     */
    random : function (min, max) {
      if (max == 0) {
        return Math.floor(Math.random())+min;
      } else {
        return Math.floor(Math.random()*max)+min;
      }
    },

    replace : function (input) {
      var mappedResult = $.map((input).split(''), function (n) {
        return getSubstitute(n, 'rigid');
      });
      return mappedResult.join("");
    }
  };
})();


$(document).ready(function () {

  var doit = function () {
    $('#outputString').html(function() {
        var replaced = unicodeGen.replace($('#inputString').val());
        return "<p>" + replaced.replace(/\n/g, "</p><p>") + "</p>";
    })};

  var setInputString = function (val) {
    $('#inputString').val(val);
  }

  $('#inputString').keyup(doit);
  $('#inputString').change(doit);
  doit();


  $('#inputi18n,#inputSmiley,#inputNam').click(function () {
    $(this).toggleClass("disabled");

    var input = "";
    switch ($(this).text()) {
      case ":-)":
        input = "٩(͡๏̯͡๏)۶   ٩(-̮̮̃•̃).";
        break;
      case "i18n":
        input = "Internationalization";
        break;
      case "Nam":
        input = "Viet Nam";
        break;
    }

    setInputString(input);
    doit();
    $(this).toggleClass("disabled");
  });

  $('#inputLorem').click(function () {
    $('#inputLorem').toggleClass("disabled");

    $.getJSON('http://baconipsum.com/api/?callback=?', { 'type':'meat-and-filler', 'start-with-lorem':'1', 'paras':'3' },
        function(baconGoodness) {
        if (baconGoodness && baconGoodness.length > 0) {
          var allParagraphs = baconGoodness.join("\n");
          setInputString(allParagraphs);
          doit();
        }
        $('#inputLorem').toggleClass("disabled");
    });
  });
});