/* the below shape is the first invader from levelsJSON
 1       1 
  1     1  
  1111111  
 11 111 11 
11111111111
1 1111111 1
1 1     1 1
   11 11   
*/
var invader = {
	invaderID: 0   ,
	shape  : ""    ,
	now    : [1, 0],
	fallingSpeed:0 ,
	// start position (very left of screen)
	pos: [0,0],
	//get the current div?
	getDiv : function (x, y) {
		return document.querySelector('[data-y="' + y + '"] [data-x="' + x + '"]');
	},

	draw : function (ch, cls) {
		var f = this.shape.split('|').map(function (a) {
			return a.split('');
		});

		for (var y = 0, lenF = f.length; y < lenF; y++){
			for (var x = 0, lenFY = f[y].length; x < lenFY; x++){
				if (f[y][x] === '1') {

					// bottom of screen
					if(y + this.pos[1] + ch[1] === 0 || gameModule.isStopped()){
						this.deleteObject();
						gameModule.stop();
						return false;
					}
					// invader has hit the defence gun, invaders win
					try{
						if(this.getDiv(x + this.pos[0] + ch[0], y + this.pos[1] + ch[1]).classList.contains('defenceGun')){
							this.deleteObject();
							gameModule.stop();
							return false;
						}
					}
					catch(err){
						this.deleteObject();
						gameModule.stop();
						return false;
					}
					this.getDiv(x + this.pos[0] + ch[0], y + this.pos[1] + ch[1]).classList.add(cls !== undefined ? cls : 'invader');
					this.getDiv(x + this.pos[0] + ch[0], y + this.pos[1] + ch[1]).classList.add(this.invaderID);
				}
			}
		}
		this.pos = [this.pos[0] - ch[0], this.pos[1] - ch[1]];
	},

	deDraw : function () {
		var elementClass = '.brick.invader.'+this.invaderID;
		if (document.querySelectorAll(elementClass).length > 0){
			this.deDraw(document.querySelector(elementClass).classList.removeMany('invader '+this.invaderID));
		}
	},

	deleteObject : function(){
		this.fallingSpeed = -1;
		this.deDraw();
		clearInterval(this.bombingInterval);
		clearInterval(this.invaderID);
	},

	move: function (e) {
		//if at fallen item reached end
		if (false === this.draw([0, 1], undefined, this.deDraw()) ) {

			//the below "draw" argument, set's it to black
			if (this.draw([0, 0], 'default', this.deDraw()) || true){
			}
		}
	},

	dropBomb : function() {
		var that                   = this;
		var invaderPositionLeft    = this.pos[0] + 5;
		var invaderPositionbottom  = this.pos[1] - 3;

		new laserObject(invaderPositionLeft,invaderPositionbottom,'down');

		if(this.bombingInterval){
			clearInterval(this.bombingInterval);
		}

		this.bombingInterval = setInterval(function () {
			that.dropBomb();
		},3000);
	},



	timerFunction : function () {
		var that = this;
		if(gameModule.isPaused() === false){
			this.move();
		}

		invader[that.invaderID] = setTimeout(function () {

			if(gameModule.isStopped()){
				that.deleteObject();
			}

			if(that.fallingSpeed >= 0){
				that.timerFunction();
			}else{
				clearInterval(that.invaderID);
				// delete also works fine, but is frowned upon
				that = null;
			}

		},that.fallingSpeed = that.fallingSpeed);
	},
};


function invaderObject(positionLeft,positionTop,levelObject){
	var invaderID                          = gameModule.getInvadersCreated();
	global.invader[invaderID]              = deepCopy(invader);
	global.invader[invaderID].shape        = levelObject.invaderShape;
	global.invader[invaderID].fallingSpeed = levelObject.invaderSpeed;
	global.invader[invaderID].pos          = [positionLeft, positionTop];
	global.invader[invaderID].invaderID    = 'invader_'+invaderID;
	global.invader[invaderID].timerFunction();
	global.invader[invaderID].dropBomb();
	return global.invader[invaderID];
}
