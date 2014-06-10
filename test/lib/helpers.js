function getRndStr() {
    return (Math.random() + 1).toString(36).substring(7);
}

chai.Assertion.addMethod('elements', function(expectedCollection) {

    var i,
        collection = this._obj,
        length = collection.length;

    for(i = 0; i < length; i++) {
        new chai.Assertion(collection[i]).to.equal(expectedCollection[i]);
    }

    this.assert(
        length === expectedCollection.length,
        "expected #{this} to have length #{exp} but got #{act}",
        "expected #{this} to not have length #{act}",
        expectedCollection.length,
        collection.length
    );
});