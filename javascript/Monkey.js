/*
	Hard coding of the left and Right part should be removed
*/
function Monkey(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
	this.frameThreshold = frameCount;
}

Monkey.prototype = Object.create(Sprite.prototype);


Monkey.prototype.update = function(){

	if (this.isVisible){
		this.y = ((this.y < (640 - this.speedY)) ? (this.y + this.speedY) : (-100));
		if ((-100) == this.y){
			this.isVisible = false;
		}
	}
}


