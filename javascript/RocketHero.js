function RocketHero(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
    this.frameThreshold = frameCount;
}

RocketHero.prototype = Object.create(Sprite.prototype);


RocketHero.prototype.update = function(){

	if (this.isVisible){
		if (this.x > 250 || this.x < 80 )
			this.speedToggle();
		this.x += this.speedX;
		spriteVariables.hero.x = this.x;
	}
}

RocketHero.prototype.speedToggle = function(){
	this.speedX = -this.speedX;
}

RocketHero.prototype.visiblityToggle = function(){
	this.isVisible = !this.isVisible;
	spriteVariables.hero.x = this.x ; // becuse rocket property is hero property
}