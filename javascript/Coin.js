function Coin(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible,  frameCount, rowCount, isAnimated);
	
	this.speedX = speed.x;
	this.speedY = speed.y; 
}

Coin.prototype = Object.create(Sprite.prototype);


Coin.prototype.update = function(){

	// to be implemented
	this.y = ((this.y < (640 - this.speedY)) ? (this.y + this.speedY) : -34);

}