(function(global){
  global.$helpers = {
    getRndStr: function() {
      return (Math.random() + 1).toString(36).substring(7);
    },
    isSupportsDataSet: 'dataset' in document.documentElement,
    isSupportsTableInnerHTML: (function(){
      try {
        document.createElement('table').innerHTML = '<tr><td></td></tr>';
        return true;
      } catch(err) {
        return false;
      }
    })()
  };
})(typeof global !== 'undefined' ? global : window);

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
