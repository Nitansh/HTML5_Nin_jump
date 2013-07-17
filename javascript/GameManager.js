function GameManager(spriteVariables){
	this.canvas              = document.getElementById("gameCanvas");
	this.context 			 = this.canvas.getContext("2d");
	this.spriteVariables     = spriteVariables;

}


GameManager.prototype.paint = function() {
	
	this.clearScreen();
	for (var spriteObject in this.spriteVariables){
		if (this.spriteVariables[spriteObject].length){
					for (var ctr = 0; ctr < this.spriteVariables[spriteObject].length; ctr++){
							this.spriteVariables[spriteObject][ctr].paint(this.context);
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
				for (var ctr = 0; ctr < this.spriteVariables[spriteObject].length; ctr++){
						this.spriteVariables[spriteObject][ctr].update();
					}
		}else{
					this.spriteVariables[spriteObject].update();			
		}

	}
	this.paint();
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