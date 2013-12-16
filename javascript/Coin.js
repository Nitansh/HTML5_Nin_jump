function Coin(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible,  frameCount, rowCount, isAnimated);
	
	this.speedX = speed.x;
	this.speedY = speed.y; 
	this.isObstacle  = false;
}

Coin.prototype = Object.create(Sprite.prototype);


Coin.prototype.update = function(){


	// to be implemented
	if (this.isVisible){	
		this.y = ((this.y < (640 - this.speedY)) ? (this.y + this.speedY) : -100);
		if (-100 == this.y){
			this.isVisible = false;
		}
	}
}

Coin.prototype.speedToggle = function(){
	this.speedY = -this.speedY;
}
