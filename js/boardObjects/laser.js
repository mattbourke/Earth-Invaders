// the below represent a simple laser of 1 div.
//1
// var shape = "1", 
var laser = {
	roundID     : 0       ,
	shape       : "1"     ,
	now         : [1, 0]  ,
	fallingSpeed: 30      ,
	direction   :''       ,
	// this determines if the board object is still part of the game or not.
	inPlay      : true    ,
	// start position (very left of screen)
	position: [0,0]       ,
	//get the current div?
	getDiv : function (x, y) {
		return document.querySelector('[data-y="' + y + '"] [data-x="' + x + '"]');
	},

	draw : function (ch, cls) {
		var f = this.shape.split('|').map(function (a) {
			return a.split('');
		});


		for (var y = 0; y < 1; y++){
			for (var x = 0; x < f[y].length; x++){

				if (f[y][x] === '1' && this.inPlay) {
					// if at top of screen
					if(y + this.position[1] + ch[1] > 60){
						gameModule.decreaseScore(2);
						this.deleteObject();
						return false;
					}
					// bottom of screen if a falling laser bomb
					if(y + this.position[1] + ch[1] < 0 || gameModule.isStopped()){
						this.deleteObject();
						return false;
					}
					
					if(this.getDiv(x + this.position[0] + ch[0], y + this.position[1] + ch[1]).classList.contains('defenceGun')){
						this.inPlay = false;
						gameModule.stop();
						this.deleteObject();
						return false;
					}

					// is an invaders position ,ie invader hit
					if(this.getDiv(x + this.position[0] + ch[0], y + this.position[1] + ch[1]).classList.contains('invader')){
						gameModule.setInvaderHit();
						var hitInvaderName = this.getDiv(x + this.position[0] + ch[0], y + this.position[1] + ch[1]).classList[2];
						var hitInvaderId   = parseInt(hitInvaderName.match(/\d+$/)[0], 10);
						var hitInvader     = global.invader[hitInvaderId];
						hitInvader.deleteObject();
						delete global.invader[hitInvaderId];
						this.deleteObject();
						boardModule.invadersExists();
						return false;
					}
					this.getDiv(x + this.position[0] + ch[0], y + this.position[1] + ch[1]).classList.add(cls !== undefined ? cls : 'laser');
					this.getDiv(x + this.position[0] + ch[0], y + this.position[1] + ch[1]).classList.add(this.roundID);
				}

			}
		}

		if( this.direction === 'up' ){
			this.position = [this.position[0] + ch[0], this.position[1] + ch[1]];
		}else{
			this.position = [this.position[0] - ch[0], this.position[1] - ch[1]];
		}

	},

	deDraw : function () {
		var elementClass = '.brick.laser.'+this.roundID;
		if (document.querySelectorAll(elementClass).length > 0){
			this.deDraw(document.querySelector(elementClass).classList.removeMany('laser '+this.roundID));
		}
	},

	deleteObject : function(){
		this.fallingSpeed = -1;
		this.deDraw();
		clearInterval(this.roundID);
	},

	move: function (e) {
		//if at fallen item reached end
		if (false === this.draw([0, 1], undefined, this.deDraw()) ) {

			//the below "draw" argument, set's it to black
			if (this.draw([0, 0], 'default', this.deDraw()) || true){

			}
		}
	},

	timerFunction : function () {
		var that = this;
		if(gameModule.isPaused() === false){
			this.move();
		}

		laser[that.roundID] = setTimeout(function () {
			if(that.fallingSpeed >= 0){
				that.timerFunction();
			}else if(gameModule.isPaused() === false){
				clearInterval(that.roundID);
			}
		},that.fallingSpeed = that.fallingSpeed);
	},
};



function laserObject(positionLeft,positionBottom,direction){
	var roundID          = gameModule.getRoundsFired();
	var laserRound       = deepCopy(laser);
	laserRound.position  = [positionLeft, positionBottom];
	laserRound.roundID   = 'laser_'+roundID;
	laserRound.direction = direction;
	laserRound.timerFunction();
	return laserRound;
}

