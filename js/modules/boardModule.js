var boardModule = (function(){

	var init        = function(levelsJSON){
		gameJson    = levelsJSON;
		// we deduct one as arrays index starts at 0 but it's length at one
		gameModule.setTotalLevels(gameJson.Levels.length-1);
	};


	function startInvaders(positionsArray){
		for( var i = 0, len = positionsArray.length; i < len; i++){
			//TODO: tidy up this, pass in integers
			invaderObject(parseInt(positionsArray[i], 10), 50, gameJson.Levels[gameModule.getCurrentLevel()]);
		}
	}

	var startLevel   = function(nextLevel){
		var levelObject = gameJson.Levels[nextLevel];
		startInvaders(gameJson.Levels[gameModule.getCurrentLevel()].invaderPositions.split(","));
	};

	function invadersExists(){
		var invadersOnBoard = ( document.querySelectorAll('.invader').length )?true:false;
		if( ! invadersOnBoard ){
			var nextLevel   = gameModule.getNextLevel();
			if( nextLevel < gameModule.getTotalLevels() ){
				startLevel(nextLevel);
				gameModule.displayLevel();
			}else{
				gameModule.stop('winner');
			}
		}
		return invadersOnBoard;
	}

	return{
		init            : init           ,
		invadersExists  : invadersExists ,
		startLevel      : startLevel
	};

})();