(function(root) {

  var bench = root.benchrunner,
    suites = bench.suites,
    libs = bench.libs;

  var element,
    elements = [];

  var setElements = function() {
    elements = new Array(20).map(function() {
      return document.createElement('div')
    })
  };

  bench.setup.push(function() {
    document.getElementById('container').innerHTML += '<div class="construct"></div>';
  });

  suites.push(Benchmark.Suite('Constructor.Simple selector')
    .add(libs[0].name, function() {
      jQuery('.construct');
    })
    .add(libs[1].name, function() {
      Zepto('.construct');
    })
    .add(libs[2].name, function() {
      $('.construct');
    })
  );

  suites.push(Benchmark.Suite('Constructor.Single HTML element')
    .add(libs[0].name, function() {
      jQuery('<div></div>');
    })
    .add(libs[1].name, function() {
      Zepto('<div></div>');
    })
    .add(libs[2].name, function() {
      $('<div></div>');
    })
  );

  suites.push(Benchmark.Suite('Constructor.HTML fragment')
    .add(libs[0].name, function() {
      jQuery('<div>1</div><div>2</div>');
    })
    .add(libs[1].name, function() {
      Zepto('<div>1</div><div>2</div>');
    })
    .add(libs[2].name, function() {
      $('<div>1</div><div>2</div>');
    })
  );

  suites.push(Benchmark.Suite('Constructor.Element')
    .add(libs[0].name, {
      setup: function() {
        element = document.createElement('div');
      },
      fn: function() {
        jQuery(element);
      }
    })
    .add(libs[1].name, {
      setup: function() {
        element = document.createElement('div');
      },
      fn: function() {
        Zepto(element);
      }
    })
    .add(libs[2].name, {
      setup: function() {
        element = document.createElement('div');
      },
      fn: function() {
        $(element);
      }
    })
  );

  suites.push(Benchmark.Suite('Constructor.ElementArray')
    .add(libs[0].name, {
      setup: setElements,
      fn: function() {
        jQuery(elements);
      }
    })
    .add(libs[1].name, {
      setup: setElements,
      fn: function() {
        Zepto(elements);
      }
    })
    .add(libs[2].name, {
      setup: setElements,
      fn: function() {
        $(elements);
      }
    })
  );

}(typeof global == 'object' && global || this));
