function HeroSheild(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
}

HeroSheild.prototype = Object.create(Sprite.prototype);

HeroSheild.prototype.update = function(){
		if (this.x > 30 || spriteVariables.hero.x > 80)
			this.x = spriteVariables.hero.x - 60;
}

HeroSheild.prototype.visiblityToggle = function(){
	this.isVisible = !this.isVisible;
}

