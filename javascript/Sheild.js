function Sheild(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
	this.isPower  = true;
	this.frameThreshold = frameCount;
}

Sheild.prototype = Object.create(Sprite.prototype);

Sheild.prototype.update = function(){

	if (this.isVisible){
		this.y = ((this.y < (640 - this.speedY)) ? (this.y + this.speedY) : (-100));
		if ((- 100) == this.y){
			this.isVisible = false;
		}
	}
}

Sheild.prototype.speedToggle = function(){
	this.speedY = -this.speedY;
}