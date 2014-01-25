function GameManager(spriteVariables){
	this.canvas              = Globalcanvas;
	this.context 			 = Globalcontext;
	this.spriteVariables     = spriteVariables;
	this.state               = 'menu';
	this.requestID           = null;
	this.isOn                = false;
}


GameManager.prototype.paint = function() {
	
	this.clearScreen();
	for (var spriteObject in this.spriteVariables){
		if (this.spriteVariables[spriteObject].length){
					for (var ctr_type = 0; ctr_type < this.spriteVariables[spriteObject].length; ctr_type++){
						for (var ctr_no = 0; ctr_no < this.spriteVariables[spriteObject][ctr_type].length; ctr_no++){
							// paint function
							if (typeof this.spriteVariables[spriteObject][ctr_type][ctr_no].paint === 'function')
								this.spriteVariables[spriteObject][ctr_type][ctr_no].paint(this.context);
						}
					}
		}else{
				if (typeof this.spriteVariables[spriteObject].paint === 'function')
			        this.spriteVariables[spriteObject].paint(this.context);			
		 }
	}
}

GameManager.prototype.update = function(){
	if (!this.state.localeCompare('play') || !this.state.localeCompare('resumed')){
		speedVariables.numberOfFrame++;
		for (var spriteObject in this.spriteVariables){
			if (this.spriteVariables[spriteObject].length){
					for (var ctr_type = 0; ctr_type < this.spriteVariables[spriteObject].length; ctr_type++){
							for (var ctr_no = 0; ctr_no < this.spriteVariables[spriteObject][ctr_type].length; ctr_no++){
								//update function
								if (typeof this.spriteVariables[spriteObject][ctr_type][ctr_no].update === 'function')
									this.spriteVariables[spriteObject][ctr_type][ctr_no].update();
							}
						}
			}else{
						if (typeof this.spriteVariables[spriteObject].update === 'function')
							this.spriteVariables[spriteObject].update();			
			}

		}

		if (speedVariables.heroDied){
			radio('MenuManagerStateUpdate').broadcast('menu');
		    radio('GameManagerStateUpdate').broadcast('menu');
			radio('HeroDied').broadcast();
			radio('TogglePauseButton').broadcast();
			radio('UpdateScoreOnGameEnd').broadcast();
			// set the progress bar, score and High score , coin update goes here ********************************************************//
		}else{
			this.paint();														//Calling the paint function on regular interval with update
			this.objectController();											//Calling the objectController function on regular interval with update
		}											
	}
}

GameManager.prototype.initGameScene = function(){
	
    spriteVariables.SetPosition();
    if (!this.isOn){
		this.isOn = true;
		self = this;		
		(function animloop(){
							requestAnimFrame(animloop);  // equal to the set Interval
							self.update();
						})();
	}
}

GameManager.prototype.clearScreen = function(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillStyle = "#6b92b9";
	this.context.fillRect(0, 0, this.canvas.width , this.canvas.height);
	
}


/* 
 * for changing the state of game using pubsub arg will be state
 */

GameManager.prototype.stateChanger =  function(state){
	this.state = state;
}
/*
 * for toggling the pause visiblity
 */

GameManager.prototype.pauseVisiblityToggle =  function(){
	spriteVariables.backButton.isVisible = !spriteVariables.backButton.isVisible;
}

/************
Manages the object in the game genration etc
*************/

GameManager.prototype.objectController = function(){

	if (0 == speedVariables.numberOfFrame % speedVariables.objectFrequency){
		// Generating the object ALgorithm 
		var rand1 = Math.floor(Math.random() * (speedVariables.monkeyProb + 1));
		var rand2 = Math.floor(Math.random() * (speedVariables.halloweenProb + 1));
		var rand3 = Math.floor(Math.random() * (speedVariables.coinProb+ 1));
		var rand4 = Math.floor(Math.random() * (speedVariables.void_obj+ 1));
		var rand5 = Math.floor(Math.random() * (speedVariables.powerProb+ 1))


		random = rand1 + rand2 + rand3 + rand4 + rand5;

		random = random + speedVariables.startRandomIndex;
		
		//Genrating the monkey
		if (speedVariables.startRandomIndex < random &&  random <= (speedVariables.startRandomIndex+speedVariables.monkeyProb) && !speedVariables.coinInProgess){
			random = Math.floor(Math.random() * 6)
			if (!this.spriteVariables.movable[0][random]['isVisible']){
				this.spriteVariables.movable[0][random]['isVisible'] = true;
			}
		//Genrating the halloween	
		}else if ( (speedVariables.startRandomIndex + speedVariables.monkeyProb) < random && random <= (speedVariables.startRandomIndex + speedVariables.monkeyProb + speedVariables.halloweenProb) && !speedVariables.coinInProgess){
			random = Math.floor(Math.random() * 6)
			if (!this.spriteVariables.movable[1][random]['isVisible']){
				this.spriteVariables.movable[1][random]['isVisible'] = true;
			}

		}else if ( (speedVariables.startRandomIndex + speedVariables.monkeyProb + speedVariables.halloweenProb) < random && random <= (speedVariables.startRandomIndex + speedVariables.monkeyProb + speedVariables.halloweenProb + speedVariables.coinProb) || speedVariables.coinInProgess){			
			
			if (!speedVariables.coinInProgess){
				random1 = Math.floor(Math.random() *  2);
				random1 =  random1 + 1;
				speedVariables.coinCount     = 5 * random1;
				speedVariables.coinInProgess = true;
				speedVariables.objectFrequency = 8;
				}
			
			if (speedVariables.coinIndex >= speedVariables.coinCount){
     			speedVariables.coinInProgess = false;
				speedVariables.coinIndex = 0;
				speedVariables.objectFrequency = 50;
			}	

			this.spriteVariables.movable[2][(8  * (random1-1))  + speedVariables.coinIndex]['isVisible'] = true;
			speedVariables.coinIndex++;

		}else if ( (speedVariables.startRandomIndex + speedVariables.monkeyProb + speedVariables.halloweenProb + speedVariables.coinProb) < random && random <= (speedVariables.startRandomIndex + speedVariables.monkeyProb + speedVariables.halloweenProb + speedVariables.coinProb + speedVariables.void_obj)){			
			
			// Do nothing :D :D since the game part need to be empty somewhere in between

		}else if (!(spriteVariables.rocketHero.isVisible || spriteVariables.heroSheild.isVisible) && (speedVariables.startRandomIndex + speedVariables.monkeyProb + speedVariables.halloweenProb + speedVariables.coinProb  + speedVariables.void_obj) < random && random <= (speedVariables.startRandomIndex + speedVariables.monkeyProb + speedVariables.halloweenProb + speedVariables.coinProb + speedVariables.void_obj + speedVariables.powerProb)){			
			if (Math.random() * 10 < 5)
				spriteVariables.rocket.isVisible = true;
			else
				spriteVariables.sheild.isVisible = true;

		}
 	}	
}

GameManager.prototype.speedToggle = function(){

	for (var spriteObject in this.spriteVariables){
			if (this.spriteVariables[spriteObject].length){
					for (var ctr_type = 0; ctr_type < this.spriteVariables[spriteObject].length; ctr_type++){
							for (var ctr_no = 0; ctr_no < this.spriteVariables[spriteObject][ctr_type].length; ctr_no++){
								//update function
								if (typeof this.spriteVariables[spriteObject][ctr_type][ctr_no].speedToggle === 'function')
									this.spriteVariables[spriteObject][ctr_type][ctr_no].speedToggle();
							}
						}
			}else{
						if (typeof this.spriteVariables[spriteObject].speedToggle === 'function')
							this.spriteVariables[spriteObject].speedToggle();			
			}
	}
}

GameManager.prototype.boolToggle =  function(){
	speedVariables.heroDied = !speedVariables.heroDied;
	gameOn = !gameOn;
}

window.requestAnimFrame = (function(){
					return  window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame    ||
							window.oRequestAnimationFrame      ||
							window.msRequestAnimationFrame     ||
							function( callback ){
								window.setTimeout(callback, speedVariables.fps);
							};
				})();
