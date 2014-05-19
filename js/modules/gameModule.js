var gameModule = (function(){

	var config = [
			"By Matt Bourke",
			"2014",
			"Earth Invaders",
			"Version 0.1"
	],
	totalScore     = 0,
	invadersKilled = 0,
	paused         = false,
	stopped        = true,
	invadersCreated= 0,
	invadersHit    = 0,
	roundsFired    = 0,
	currentLevel   = 0,
	totalLevels    = 0;

	var getNextLevel = function(){
		return currentLevel++;
	};

	var getCurrentLevel = function(){
		return currentLevel;
	};

	function pause(){
		paused = (paused === true)?false:true;
	}

	function isPaused(){
		return paused;
	}

	function stop(ending){
		stopped            = true;
		var stoppedMessage = ( ending === 'winner' )?"Champion!":"Game Over - Loser!";
		document.getElementById("status").innerHTML      = stoppedMessage;
		document.getElementById("overlay").style.display = 'block';
		document.getElementById('start').disabled        = false;
		if( ending === 'winner' ){
			showCredits();
		}
		gameReset();
	}

	var gameReset = function(){
		totalScore     = 0;
		invadersKilled = 0;
		paused         = false;
		stopped        = true;
		invadersCreated= 0;
		invadersHit    = 0;
		roundsFired    = 0;
		currentLevel   = 0;
		totalLevels    = 0;
	};

	function showCredits(){

		(function myLoop (i) {
			setTimeout(function () {
				if(i >= 0){
					document.getElementById("status").innerHTML = config[i];
					i--;
					myLoop(i);
				}
			},1500);
		})(config.length-1);
	}

	function isStopped(){
		return stopped;
	}

	function start(){
		document.getElementById('stop').disabled    = false;
		document.getElementById("status").innerHTML = "Enemy inbound";
		stopped   = false;
		var count = 5;
		var timer = function(){
			count = count-1;
			if (count < 0){
				clearInterval(counter);
				document.getElementById("overlay").style.display = 'none';
				boardModule.startLevel(0);
				return;
			}

			document.getElementById("status").innerHTML = count;
			
		};

		var counter = setInterval(timer, 1000);
		displayScore();
		displayLevel();
	}

	function setInvaderHit(){
		invadersHit++;
		increaseScore(1);
	}

	function getInvadersHit(){
		return invadersHit;
	}

	function getScore(){
		return totalScore;
	}

	function increaseScore(points){
		totalScore = totalScore + points;
		displayScore();
	}

	function decreaseScore(points){
		totalScore = totalScore - points;
		displayScore();
	}

	function displayScore(){
		document.getElementById('result').innerHTML = totalScore;
	}

	function getInvadersCreated(){
		invadersCreated = (typeof invadersCreated === 'undefined')?1:invadersCreated + 1;
		return invadersCreated;
	}

	function getRoundsFired(){
		roundsFired = (typeof roundsFired === 'undefined')?1:roundsFired + 1;
		return roundsFired;
	}

	function displayLevel(){
		var finalLevel   = getTotalLevels()+1;
		var currentLevel = getCurrentLevel()+1;
		document.getElementById('levelStatus').innerHTML =  currentLevel +' of '+ finalLevel;
	}

	function setTotalLevels(levelCount){
		totalLevels = levelCount;
	}


	function getTotalLevels(){
		return totalLevels;
	}



	return{
		pause              : pause             ,
		isPaused           : isPaused          ,
		start              : start             ,
		stop               : stop              ,
		isStopped          : isStopped         ,
		setInvaderHit      : setInvaderHit     ,
		getInvadersHit     : getInvadersHit    ,
		getNextLevel       : getNextLevel      ,
		displayLevel       : displayLevel      ,
		getInvadersCreated : getInvadersCreated,
		getRoundsFired     : getRoundsFired    ,
		config             : config            ,
		increaseScore      : increaseScore     ,
		decreaseScore      : decreaseScore     ,
		setTotalLevels     : setTotalLevels    ,
		getTotalLevels     : getTotalLevels    ,
		getCurrentLevel    : getCurrentLevel   ,
		getScore           : getScore


	};


})();