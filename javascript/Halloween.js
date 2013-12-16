function Halloween(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
	this.isObstacle  = true;
	this.frameThreshold = frameCount;
}

Halloween.prototype = Object.create(Sprite.prototype);


Halloween.prototype.update = function(){

	if (this.isVisible){
		this.y = ((this.y < (640 - this.speedY)) ? (this.y + this.speedY) : (-100));
		if ((- 100) == this.y){
			this.isVisible = false;
		}
	}
}

Halloween.prototype.speedToggle = function(){
	this.speedY = -this.speedY;
}