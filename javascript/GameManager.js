function GameManager(spriteVariables){
	this.canvas              = document.getElementById("gameCanvas");
	this.context 			 = this.canvas.getContext("2d");
	this.spriteVariables     = spriteVariables;

}


GameManager.prototype.paint = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillStyle = "#6b92b9";
	this.context.fillRect(0, 0, this.canvas.width , this.canvas.height);
	
	this.spriteVariables.background.paint(this.context);
	this.spriteVariables.leftRamp1.paint(this.context);
	this.spriteVariables.leftRamp2.paint(this.context);
	this.spriteVariables.rightRamp1.paint(this.context);
	this.spriteVariables.rightRamp2.paint(this.context);
	this.spriteVariables.hero.paint(this.context);
}

GameManager.prototype.update = function(){
	speedVariables.numberOfFrame++;
	this.spriteVariables.hero.update();
	this.spriteVariables.leftRamp1.update();
	this.spriteVariables.leftRamp2.update();
	this.spriteVariables.rightRamp1.update();
	this.spriteVariables.rightRamp2.update();
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


