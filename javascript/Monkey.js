/*
	Hard coding of the left and Right part should be removed
*/
function Monkey(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
	this.isObstacle  = true;
	this.frameThreshold = frameCount;
}

Monkey.prototype = Object.create(Sprite.prototype);


Monkey.prototype.update = function(){

	if (this.isVisible){
		this.y = ((this.y < (commonConfiguration.ClientHeight - this.speedY)) ? (this.y + this.speedY) : (commonConfiguration.YUpperLimit));
		if ((commonConfiguration.YUpperLimit) == this.y){
			this.isVisible = false;
		}
	}
}

Monkey.prototype.speedToggle = function(){
	this.speedY = -this.speedY;
}