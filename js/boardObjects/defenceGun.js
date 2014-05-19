// the below represent a simple 2 row gun
//0001000
//1111111
var defenceGun = {
	shape    : "1111111|0001000",
	now      : [1, 0],
	// start position (very left of screen)
	position : [1, 0],
	getDiv : function (x, y) {
		return document.querySelector('[data-y="' + y + '"] [data-x="' + x + '"]');
	},

	draw : function (ch, className) {
		
		var shapeArrayObject = this.shape.split('|').map(function (a) {
			return a.split('');
		});

		var shapeArrayObjectLength = shapeArrayObject.length;
		for (var y = 0; y < shapeArrayObjectLength; y++){
			
			var shapeArrayObjectRowLength = shapeArrayObject[y].length;
			for (var x = 0; x < shapeArrayObjectRowLength; x++){

				if (shapeArrayObject[y][x] === '1') {
					// if wider than the board's width of "75" divs (max right of the board)
					if(x + this.position[0] + ch[0] >= 75){
						return false;
					}
					// if the max left of the board.
					if(x + this.position[0] + ch[0] <= 0 ){
						return false;
					}
					// is a fallen objects this.position
					if(this.getDiv(x + this.position[0] + ch[0], y + this.position[1] + ch[1]).classList.contains('on')){
						return false;
					}
					this.getDiv(x + this.position[0] + ch[0], y + this.position[1] + ch[1]).classList.add(className !== undefined ? className : 'defenceGun');
				}
			}
		}
		this.position = [this.position[0] + ch[0], this.position[1] + ch[1]];
	},

	deDraw : function () {
		if (document.querySelectorAll('.defenceGun').length > 0){
			this.deDraw(document.querySelector('.defenceGun').classList.remove('defenceGun'));
		}
	}
	
};

