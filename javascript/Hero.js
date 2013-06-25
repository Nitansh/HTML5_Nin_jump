function Hero(positionX, positionY, imageUrl, isVisible, frameCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, isAnimated);
	
	this.speedX = speed.x;
	this.speedY = speed.y; 
}

Hero.prototype = Object.create(Sprite.prototype);


Hero.prototype.update = function(){

	// to be implemented


}

