function ramp(positionX, positionY, imageUrl, isVisible, frameCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, isAnimated);
	
	this.speedX = speed.x;
	this.speedY = speed.y; 
}

ramp.prototype = Object.create(Sprite.prototype);


ramp.prototype.update = function(){

	// to be implemented


}