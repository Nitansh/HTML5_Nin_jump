function Ramp(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	
	this.speedX = speed.x;
	this.speedY = speed.y; 
}

Ramp.prototype = Object.create(Sprite.prototype);


Ramp.prototype.update = function(){

	// to be implemented
	this.y = ((this.y < (640 - this.speedY)) ? (this.y + this.speedY) : -this.Height);
}