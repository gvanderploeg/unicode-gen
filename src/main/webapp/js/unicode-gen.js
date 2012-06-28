
var unicodeGen = (function() {

  var mapping = {
    'a':[ 'e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'ff41', '251'],
    'b': ['ff42', '183', '185'],
    'c': ['ff43'],
    'd':['13e7', 'ff44', '501'],
    'e': [ 'e8', 'e9', 'ea', 'eb' , 'ff45'],
    'f': ['ff46'],
    'g': ['ff47', '1e5', '262'],
    'h': ['ff48', '570', '266'],
    'i': [ 'ec', 'ed', 'ef', 'ff49'],
    'j': ['ff4a', '3f3', '575'],
    'k': ['ff4b', '199'],
    'l': ['ff4c', '26d'],
    'm': ['ff4d', '3fb'],
    'n': ['ff4e', '43b', '509'],
    'o': [ 'f2', 'ff4f', '7c0' ],
    'p': ['ff50', '3c1'],
    'q': ['ff51', '24b'],
    'r': ['ff52'],
    's': ['ff53', '455'],
    't': ['ff54'],
    'u': ['f9', 'fa', 'fb', 'fc', 'ff55'],
    'v': ['ff56', '475'],
    'w': ['ff57', '26f', '270'],
    'x': ['ff58', '445', '425', '4fd'],
    'y': ['ff59', '3d2'],
    'z': ['ff5a', '225', '1b6']
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
    },

    getUnicodeTableSource: function() {
      /*
       Return a base for populating a 0-ffff table.
      Form:
      [
        {
          "label": "0 - 1fff",
          "startIndex: 0,
          count: 4095
          },
        {
          "label": "2000 - 2fff",
          "startIndex: 2000,
          count: 4095
          },

       */
      var items = [];
      for (var i = 0; i < 8; i++) {
        var startIndex = i*2048;
        var endIndex = startIndex + 2047;
        var label = startIndex.toString(16) + " - " + endIndex.toString(16);
        items.push( {"label" : label, "startIndex" : startIndex, "count" : 2047});
      }
      return items;
    },
    getUnicodeTable: function(start, end) {

      var html = "<table>";
      for (var i = start; i < end; i++) {
        if (i % 16 == 0) {
          html += "<tr>";
        }
        html +="<td>";
        html += i.toString(16) + "<br />";
        html += String.fromCharCode(i);
        html += "</td>";
        if (i % 16 == 15) {
          html += "</tr>";
        }
      }
      return html;
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
  
  // Encode the title as well, while we're at it.
  $("h1#title").text(unicodeGen.replace($("h1#title").text()));


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
  
  $('#unicodeTable').on('shown', function () {
    /*
    $("#unicodePagination ul").append(function() {
      var tableStructure = unicodeGen.getUnicodeTableSource();
      var html = "";
      for (i in tableStructure) {
        html += '<li><a href="#" data-start="' + tableStructure[i]["start"] +'" data-count="' + tableStructure[i]["count"] +'">' + tableStructure[i]["label"] +"</a></li>"
      }
      return html;
    });
    $("#unicodePagination li a").click(function() {
      console.log($(this).attr("data-start"));
    })
     */
    // initially populate with 0000 - 0fff
    $("#unicodeTableBody").html(unicodeGen.getUnicodeTable(0, 4096));
  });
});