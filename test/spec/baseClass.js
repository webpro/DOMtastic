describe('baseClass', function() {

  function _inherits(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    subClass.__proto__ = superClass;
  }

  function MyComponent() {
    Object.getPrototypeOf(MyComponent.prototype).constructor.apply(this, arguments); // super();
  }

  _inherits(MyComponent, $.BaseClass);

  MyComponent.prototype.doSomething = function(value) {
    return this.addClass(value);
  };

  it('should allow to extend from baseClass', function() {
    var component = new MyComponent('body');
    assert(component instanceof MyComponent);
    assert(component instanceof $.BaseClass);
    assert(MyComponent.prototype instanceof $.BaseClass);
  });

  it('should extend properly from baseClass', function() {
    var expected = $helpers.getRndStr();
    var component = new MyComponent('body');
    component.doSomething(expected);
    assert(typeof component.find === 'function');
    assert(document.body.className.indexOf(expected) !== -1);
  });

  it('should accept Nodes, just like $()', function() {
    var expected = $(document.body);
    var actual = new MyComponent(document.body);
    assert(actual[0] === expected[0]);
  });

  it('should be chainable', function() {
    var className = $helpers.getRndStr();
    var expected = new MyComponent(document.body);
    var actual = expected.doSomething(className).addClass(className);
    assert(actual === expected);
    assert(document.body.className.indexOf(className) !== -1);
  });

});
