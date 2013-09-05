function GameManager(spriteVariables){
	this.canvas              = document.getElementById("gameCanvas");
	this.context 			 = this.canvas.getContext("2d");
	this.spriteVariables     = spriteVariables;

}


GameManager.prototype.paint = function() {
	
	this.clearScreen();
	for (var spriteObject in this.spriteVariables){
		if (this.spriteVariables[spriteObject].length){
					for (var ctr_type = 0; ctr_type < this.spriteVariables[spriteObject].length; ctr_type++){
						for (var ctr_no = 0; ctr_no < this.spriteVariables[spriteObject][ctr_type].length; ctr_no++){
							// paint function
							this.spriteVariables[spriteObject][ctr_type][ctr_no].paint(this.context);
						}
					}
		}else{
			   this.spriteVariables[spriteObject].paint(this.context);			
		 }
	}
}

GameManager.prototype.update = function(){
	speedVariables.numberOfFrame++;
	for (var spriteObject in this.spriteVariables){
		if (this.spriteVariables[spriteObject].length){
				for (var ctr_type = 0; ctr_type < this.spriteVariables[spriteObject].length; ctr_type++){
						for (var ctr_no = 0; ctr_no < this.spriteVariables[spriteObject][ctr_type].length; ctr_no++){
							//update function
							this.spriteVariables[spriteObject][ctr_type][ctr_no].update();
						}
					}
		}else{
					this.spriteVariables[spriteObject].update();			
		}

	}
	this.paint();														//Calling the paint function on regular interval with update
	this.objectController();											//Calling the objectController function on regular interval with update
}

GameManager.prototype.initGameScene = function(){
	
	this.canvas.height = window.innerHeight;
	this.canvas.width  = window.innerWidth;
	self = this;	
		
	(function animloop(){
						requestAnimFrame(animloop);  // equal to the set Interval
						self.update();
					})();
	}

GameManager.prototype.clearScreen = function(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillStyle = "#6b92b9";
	this.context.fillRect(0, 0, this.canvas.width , this.canvas.height);
	
}

/************
Manages the object in the game genration etc
*************/

GameManager.prototype.objectController = function(){

	if (0 == speedVariables.numberOfFrame % speedVariables.objectFrequency){
		// Generating the object ALgorithm 
		
		//Genrating the monkey

		var random = Math.floor(Math.random() * speedVariables.monkeyProb + speedVariables.halloweenProb + speedVariables.coinProb)

		
		if (speedVariables.coinInProgess)
		{

			console.log(speedVariables.coinCount);
			console.log(speedVariables.coinIndex);

		}else
		console.log("Something have to be genrated random number is " + random +  "coin genration bool" +  speedVariables.coinInProgess );


		if (0 < random &&  random <= speedVariables.monkeyProb && !speedVariables.coinInProgess){
			random = Math.floor(Math.random() * 6)
			if (!this.spriteVariables.movable[0][random]['isVisible']){
				this.spriteVariables.movable[0][random]['isVisible'] = true;
			}else{
				// Genrate the power
			}
			
		}else if (speedVariables.monkeyProb < random && random <= speedVariables.monkeyProb + speedVariables.halloweenProb && !speedVariables.coinInProgess){
			random = Math.floor(Math.random() * 6)
			if (!this.spriteVariables.movable[1][random]['isVisible']){
				this.spriteVariables.movable[1][random]['isVisible'] = true;
			}else{
				// Genrate the power
			}

		}else if (speedVariables.monkeyProb + speedVariables.halloweenProb < random && random <= speedVariables.monkeyProb + speedVariables.halloweenProb + speedVariables.coinProb || speedVariables.coinInProgess){			
			
			if (!speedVariables.coinInProgess){

				random1 = Math.floor(Math.random() *  2);
				random1 =  random1 + 1;
				speedVariables.coinCount     = 4 * random1;
				speedVariables.coinInProgess = true;
			}
			

			this.spriteVariables.movable[2][(8  * (random1-1))  + speedVariables.coinIndex]['isVisible'] = true;
			speedVariables.coinIndex++;
			

			if (speedVariables.coinIndex >= speedVariables.coinCount){

				speedVariables.coinInProgess = false;
				speedVariables.coinIndex = 0;
			}		
		}
 	}	
}

window.getInput = function(event){
	spriteVariables.hero.onInput(event);
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


 window.addEventListener("onclick", window.getInput, false);