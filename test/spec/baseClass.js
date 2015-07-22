describe('baseClass', function() {

    function MyComponent() {
        Object.getPrototypeOf(MyComponent.prototype).constructor.apply(this, arguments); // super()
    }

    _inherits(MyComponent, $.BaseClass);

    MyComponent.prototype.doSomething = function(value) {
        return this.addClass(value);
    };

    it('should allow to extend from baseClass', function() {
        var component = new MyComponent('body');
        expect(component instanceof MyComponent).to.be.true;
        expect(component instanceof $.BaseClass).to.be.true;
        expect(MyComponent.prototype instanceof $.BaseClass).to.be.true;
    });

    it('should extend properly from baseClass', function() {
        var expected = getRndStr(),
            component = new MyComponent('body');
        component.doSomething(expected);
        expect(component.find).to.be.a('function');
        expect(document.body.className).to.contain(expected);
    });

    it('should accept Nodes, just like $()', function() {
        var expected = $(document.body),
            actual = new MyComponent(document.body);
        expect(actual).to.have.same.elements(expected);
    });

    it('should be chainable', function() {
        var className = getRndStr(),
            expected = new MyComponent(document.body),
            actual = expected.doSomething(className).addClass(className);
        expect(actual).to.equal(expected);
        expect(document.body.className).to.contain(className);
    });

});
