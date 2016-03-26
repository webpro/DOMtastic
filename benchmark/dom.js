(function(root) {

  var bench = root.benchrunner,
    suites = bench.suites,
    libs = bench.libs;

  var element,
    helpers = {
      clean: {
        dom: function() {
          document.getElementById('dom').innerHTML = '<div class="dom"></div>';
        },
        attr: function() {
          document.getElementById('attr').innerHTML = '<div class="attr"></div>';
        }
      }
    };

  bench.setup.push(function() {
    document.getElementById('container').innerHTML +=
      '<div id="attr"><div class="attr"></div></div>' +
      '<div id="dom"><div class="dom"></div></div>';
  });

  suites.push(Benchmark.Suite('DOM.Manipulation')
    .add(libs[0].name, {
      setup: function() {
        element = jQuery('.dom');
      },
      fn: function() {
        element.append('<div>foo</div><div>bar</div>').before('<div>foo</div><div>bar</div>').after('<div>foo</div><div>bar</div>').html('<div>foo</div><div>bar</div>');
      },
      onCycle: helpers.clean.dom,
      teardown: helpers.clean.dom
    })
    .add(libs[1].name, {
      setup: function() {
        element = Zepto('.dom');
      },
      fn: function() {
        element.append('<div>foo</div><div>bar</div>').before('<div>foo</div><div>bar</div>').after('<div>foo</div><div>bar</div>').html('<div>foo</div><div>bar</div>');
      },
      onCycle: helpers.clean.dom,
      teardown: helpers.clean.dom
    })
    .add(libs[2].name, {
      setup: function() {
        element = $('.dom');
      },
      fn: function() {
        element.append('<div>foo</div><div>bar</div>').before('<div>foo</div><div>bar</div>').after('<div>foo</div><div>bar</div>').html('<div>foo</div><div>bar</div>');
      },
      onCycle: helpers.clean.dom,
      teardown: helpers.clean.dom
    })
  );

  suites.push(Benchmark.Suite('DOM.Attr')
    .add(libs[0].name, {
      setup: function() {
        element = jQuery('.attr');
      },
      fn: function() {
        element.attr('foo', 'bar').attr({a: 'b', c: 'd'});
      },
      onCycle: helpers.clean.attr,
      teardown: helpers.clean.attr
    })
    .add(libs[1].name, {
      setup: function() {
        element = Zepto('.attr');
      },
      fn: function() {
        element.attr('foo', 'bar').attr({a: 'b', c: 'd'});
      },
      onCycle: helpers.clean.attr,
      teardown: helpers.clean.attr
    })
    .add(libs[2].name, {
      setup: function() {
        element = $('.attr');
      },
      fn: function() {
        element.attr('foo', 'bar').attr({a: 'b', c: 'd'});
      },
      onCycle: helpers.clean.attr,
      teardown: helpers.clean.attr
    })
  );

}(typeof global == 'object' && global || this));
