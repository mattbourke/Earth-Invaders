// this is basically where I'm putting stuff till I work out a place to put it during some final refactoring.#

DOMTokenList.prototype.addMany = function(classes) {
    var array = classes.split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
      this.add(array[i]);
    }
};

DOMTokenList.prototype.removeMany = function(classes) {
    var array = classes.split(' ');
    for (var i = 0, length = array.length; i < length; i++) {
      this.remove(array[i]);
    }
};

function deepCopy(p, c){
	var c = c || {};
	for (var i in p){
		if( typeof p[i] === 'object' ){
			c[i] = (p[i].constructor === Array) ? [] : {};
			deepCopy(p[i], c[i]);
		}else{
			c[i] = p[i];
		}
	}
	return c;
}

var global = (function () {
	return this || (1, eval)('this');
}());

