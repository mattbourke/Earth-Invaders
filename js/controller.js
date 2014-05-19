// view me more as a hand held controller than a traditional MVC front controller.
(function(){
	defenceGun.draw([0, 0]);
	var key = [];
	window.addEventListener('keydown', keyDownFunction = function (e) {
		//right arrow - left arrow
		if(gameModule.isPaused() === true || gameModule.isStopped() === true){
			return false;
		}

		key[e.keyCode] = e.type === 'keydown';

		if ((e.keyCode === 39 || e.keyCode === 37) && false === defenceGun.draw([e.keyCode === 39 ? 1 : -1, 0], undefined, defenceGun.deDraw())) {
			defenceGun.draw([0, 0], undefined, defenceGun.deDraw());
		}
		//if space bar and left
		if(key[32] && key[39]){
			fireGun();
			return false;
		}

		if(key[32] && key[37]){
			fireGun();
			return false;
		}
		//if space bar
		if (e.keyCode === 32){
			fireGun();
			return false;
		}

		function fireGun(){
			var gunPositionLeft   = defenceGun.position[0] + 3;
			var gunPositionbottom = defenceGun.position[1] + 2;
			var shape             = "1";
			new laserObject(gunPositionLeft,gunPositionbottom,'up');
		}


	});

	window.addEventListener('keyup', keyDownFunction = function (e) {
		//right arrow - left arrow
		key = [];
	});

	// --------- code for the buttons, start, stop etc

	document.getElementById('start').onclick = function(e){
		e.stopPropagation();
		boardModule.init(levelsJSON);
		this.disabled  = true;
		gameModule.start();
	};

	document.getElementById('pause').onclick = function(e){
		e.stopPropagation();
		gameModule.pause();
	};

	document.getElementById('stop').onclick = function(e){
		e.stopPropagation();
		this.disabled  = true;
		document.getElementById('start').disabled = false;
		gameModule.stop();
	};
})();