function Halloween(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
	this.frameThreshold = frameCount;
}

Halloween.prototype = Object.create(Sprite.prototype);


Halloween.prototype.update = function(){

	this.y = ((this.y < (640 - this.speedY)) ? (this.y + this.speedY) : -this.Height);
	
}

