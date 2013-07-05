/*
	Hard coding of the left and Right part should be removed
*/
function Hero(positionX, positionY, imageUrl, isVisible, frameCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, isAnimated);
	this.animationId = 0;
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
	this.isLeft   = false;
	this.isRight  = true ;
	this.inAir    = false;
	
	this.Animation(0);
}

Hero.prototype = Object.create(Sprite.prototype);


Hero.prototype.update = function(){

	
	if (this.inAir && this.isLeft){
		this.leftToRightAnimation();
	}
	
	if (this.inAir && this.isRight){
		this.rightToLeftAnimation();
	}

}


Hero.prototype.onInput = function(evnt){

	if (!this.inAir){		
		
		this.inAir = !this.inAir;
	}
}


Hero.prototype.Animation = function(Anim){

	switch (Anim) {
		case 0:{
			this.startAnimIndex = 0; // to change animation in a image
			this.frameThreshold = 8; // number of frame in animation	
			break;
		}
		case 1:{
			this.startAnimIndex = 8; // to change animation in a image
			this.frameThreshold = 8; // number of frame in animation	
			break;
		}
		case 2:{
			this.startAnimIndex = 16; // to change animation in a image
			this.frameThreshold = 4; // number of frame in animation	

			break;
		}
		case 3:{
			this.startAnimIndex = 20; // to change animation in a image
			this.frameThreshold = 4; // number of frame in animation	
			break;
		}
		case 4:{
			this.startAnimIndex = 24; // to change animation in a image
			this.frameThreshold = 4; // number of frame in animation				
			break;
		}
		case 5:{
			this.startAnimIndex = 28; // to change animation in a image
			this.frameThreshold = 4; // number of frame in animation				
			break;
		}
		default :{
			alert("No Such animation found");
		}
	}

}

Hero.prototype.leftToRightAnimation = function(){

	if (this.x + 40 <= (360 - 30)){
		if (this.x < 360 / 2){
			this.Animation(2);
		}else {
			this.Animation(3);
		}


		this.x  = this.x +  this.speedX;
	}

	if (this.x + 40 > (360 - 30)){
		this.inAir   =  false;
		this.isRight = true;
		this.isLeft  = false;
		this.Animation(0);
		this.x = (360 - 30 - 40 );
	}

}

Hero.prototype.rightToLeftAnimation = function(){

	if (this.x  >= 30){
		if (this.x < 360 / 2){
			this.Animation(2);
		}else {
			this.Animation(3);
		}
		this.x  = this.x - this.speedX;
	}

	if (this.x  < 30){
		this.inAir  =  false;
		this.isLeft =  true;
		this.isRight=  false; 
		this.Animation(1);
		this.x  = 30;
	}

}