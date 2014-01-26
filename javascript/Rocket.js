function Rocket(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
	this.isPower  = true;
	this.frameThreshold = frameCount;
}

Rocket.prototype = Object.create(Sprite.prototype);

Rocket.prototype.update = function(){

	if (this.isVisible){
		this.y = ((this.y < (640 - this.speedY)) ? (this.y + this.speedY) : (-100));
		if ((- 100) == this.y){
			this.isVisible = false;
		}
	}
}

Rocket.prototype.speedToggle = function(){
	this.speedY = -this.speedY;
}