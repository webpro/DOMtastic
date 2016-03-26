(function(root) {

  var bench = root.benchrunner,
    suites = bench.suites,
    libs = bench.libs;

  var element,
    helpers = {
      clean: {
        class: function() {
          document.getElementById('class').innerHTML = '<div class="class"></div>';
        }
      }
    };

  bench.setup.push(function() {
    document.getElementById('container').innerHTML +=
      '<div id="class"><div class="class"></div></div>'
  });

  suites.push(Benchmark.Suite('Class.Single')
    .add(libs[0].name, {
      setup: function() {
        element = jQuery('.class');
      },
      fn: function() {
        element.addClass('foo').removeClass('foo').toggleClass('foo').removeClass('foo');
      },
      onCycle: helpers.clean.class,
      teardown: helpers.clean.class
    })
    .add(libs[1].name, {
      setup: function() {
        element = Zepto('.class');
      },
      fn: function() {
        element.addClass('foo').removeClass('foo').toggleClass('foo').removeClass('foo');
      },
      onCycle: helpers.clean.class,
      teardown: helpers.clean.class
    })
    .add(libs[2].name, {
      setup: function() {
        element = $('.class');
      },
      fn: function() {
        element.addClass('foo').removeClass('foo').toggleClass('foo').removeClass('foo');
      },
      onCycle: helpers.clean.class,
      teardown: helpers.clean.class
    })
  );

}(typeof global == 'object' && global || this));
