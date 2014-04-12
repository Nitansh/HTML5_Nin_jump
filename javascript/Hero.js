/*
	Hard coding of the left and Right part should be removed
*/
function Hero(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated, speed){
	this.base 	= Sprite;
	this.base(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated);
	this.animationId = 0;
	this.speedX   = speed.x;
	this.speedY   = speed.y; 
	this.isLeft   = false;
	this.isRight  = true ;
	this.inAir    = false;
	this.lastImage= null ;
	this.newImage = null ;
	this.coinNumber = 0;
	this.heroFalling = false;
	this.rocketPower = false;
	if (!localStorage.RocketMeter || localStorage.RocketMeter == 0 ) 
		localStorage.RocketMeter = 1;
	this.rocketPowerCtr =  speedVariables.rocketPowerCtr * (localStorage.RocketMeter);
	
	if (!localStorage.shieldMeter || localStorage.shieldMeter == 0 )  
		localStorage.shieldMeter = 1;
	this.sheildPowerCtr =  speedVariables.sheildPowerCtr * localStorage.shieldMeter;
	this.shieldPower = false;
	this.autoPilot   = true;
	this.Animation(0);

}

Hero.prototype = Object.create(Sprite.prototype);

Hero.prototype.update = function(){

	this.collisionLogic();
	
	if (this.rocketPower && --this.rocketPowerCtr <= 0){
		this.rocketPower = !this.rocketPower;
		if (!localStorage.RocketMeter || localStorage.RocketMeter == 0 ) 
			localStorage.RocketMeter = 1;
		this.rocketPowerCtr = speedVariables.rocketPowerCtr * localStorage.RocketMeter;
		this.isVisible = true;
		this.rocketEndAnimation();
		radio('HeroRocketPower').broadcast();
	}

	if (this.shieldPower && --this.sheildPowerCtr <= 0 ){
		this.shieldPower = !this.shieldPower;
		if (!localStorage.shieldMeter || localStorage.shieldMeter == 0 )  
			localStorage.shieldMeter = 1;
		this.sheildPowerCtr = speedVariables.sheildPowerCtr * localStorage.shieldMeter;
		radio('HeroShieldOn').broadcast();
	}

	if (this.heroFalling){
		this.heroTata();
	}
	if (this.inAir && this.isLeft){
		this.leftToRightAnimation();
	}
	
	if (this.inAir && this.isRight){
		this.rightToLeftAnimation();
	}

}

Hero.prototype.onInput = function(evnt){


	if (!this.inAir && !this.heroFalling && !this.rocketPower){		
		this.inAir = !this.inAir;
	}
}

Hero.prototype.Animation = function(Anim){

	switch (Anim) {
		case 0:{
			this.animationId = 0;
			this.startAnimIndex = 0; // to change animation in a image
			this.frameThreshold = 8; // number of frame in animation	
			break;
		}
		case 1:{
			this.animationId = 1;
			this.startAnimIndex = 8; // to change animation in a image
			this.frameThreshold = 8; // number of frame in animation	
			break;
		}
		case 2:{
			this.animationId = 2;
			this.startAnimIndex = 16; // to change animation in a image
			this.frameThreshold = 4; // number of frame in animation	

			break;
		}
		case 3:{
			this.animationId = 3;
			this.startAnimIndex = 20; // to change animation in a image
			this.frameThreshold = 4; // number of frame in animation	
			break;
		}
		case 4:{
			this.animationId = 4;
			this.startAnimIndex = 24; // to change animation in a image
			this.frameThreshold = 4; // number of frame in animation				
			break;
		}
		case 5:{
			this.animationId = 5;
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

	// This.x + hero.width <= client.width - rampwidth 
	if (this.x + this.Width <= (commonConfiguration.ClientWidth - commonConfiguration.rampWidth)){
		if (this.x < commonConfiguration.ClientWidth / 2){
			this.Animation(2);
		}else {
			this.Animation(3);
		}


		this.x  = this.x +  this.speedX;
	}

	if (this.x + this.Width > (commonConfiguration.ClientWidth - commonConfiguration.rampWidth)){
		this.inAir   =  false;
		this.isRight = true;
		this.isLeft  = false;
		this.Animation(0);
		this.x = (commonConfiguration.ClientWidth - commonConfiguration.rampWidth - this.Width );
	}

}

Hero.prototype.rightToLeftAnimation = function(){

	if (this.x  >= commonConfiguration.rampWidth){
		if (this.x < commonConfiguration.ClientWidth / 2){
			this.Animation(2);
		}else {
			this.Animation(3);
		}
		this.x  = this.x - this.speedX;
	}

	if (this.x  < commonConfiguration.rampWidth){
		this.inAir  =  false;
		this.isLeft =  true;
		this.isRight=  false; 
		this.Animation(1);
		this.x  = commonConfiguration.rampWidth;
	}

}

Hero.prototype.collisionLogic = function(){
	for (var spriteObject in spriteVariables){
		if (spriteVariables[spriteObject].length){
			for (var ctr_type = 0; ctr_type < spriteVariables[spriteObject].length; ctr_type++){	
				for (var ctr_no = 0; ctr_no < spriteVariables[spriteObject][ctr_type].length; ctr_no++){
					// Advance Collision detection
					if (this.autoPilot && spriteVariables[spriteObject][ctr_type][ctr_no].isObstacle){
						this.AI(spriteVariables[spriteObject][ctr_type][ctr_no]);
					}
					//update function
					if(this.collidesWith(spriteVariables[spriteObject][ctr_type][ctr_no])){
						if(spriteVariables[spriteObject][ctr_type][ctr_no].isObstacle){
							this.updateObject(spriteVariables[spriteObject][ctr_type][ctr_no] ,true);
							
						}else{
							this.updateObject(spriteVariables[spriteObject][ctr_type][ctr_no] ,false);
						}
					}
				}
			
			}
		}
		else{
			if(spriteVariables[spriteObject].isPower && this.collidesWith(spriteVariables[spriteObject])){
				this.powerObject(spriteVariables[spriteObject]);
			} 
		}	
	}	
}


Hero.prototype.updateObject = function(obj, visiblility){
	if (!visiblility){
		this.updateCoinCount();
	}else{
		radio('TogglePauseButton').broadcast();
		this.heroFalling = true;
		radio('HeroDieing').broadcast();
	}
	
	obj.isVisible = false;
	obj.y = commonConfiguration.YUpperLimit;
}

Hero.prototype.powerObject = function(power){

	power.isVisible = false;
	power.y =  commonConfiguration.YUpperLimit;

	if (power instanceof Rocket){
		this.rocketPower = true;
		this.isVisible = false;
		radio('HeroRocketPower').broadcast();
	}

	if (power instanceof Sheild){
		this.shieldPower = true;
		radio('HeroShieldOn').broadcast();
	}

}

Hero.prototype.heroTata = function(){

	this.speedY = 1;
	if (this.y < commonConfiguration.ClientHeight){
		this.y += this.speedY;
	}else{
		speedVariables.heroDied =  true;
	}

	if (this.isLeft){
		this.Animation(5);
	}
	if (this.isRight){
		this.Animation(4);
	}

}

Hero.prototype.rocketEndAnimation = function(){
	this.inAir = true;
	if (this.x < commonConfiguration.ClientWidth/2){
		this.isRight = true;
		this.isLeft = false;	
	}else{
		this.isRight = false;
		this.isLeft = true;			
	}
	
}

Hero.prototype.updateCoinCount= function(){
	radio('UpdateCoinCount').broadcast();
}


Hero.prototype.AI = function(obj){
	if(this.AdvanceCollision(obj)){
		this.onInput(obj);
	}
}


Hero.prototype.AdvanceCollision = function(obj){
	if ((this.x + this.Width > obj.x + obj.Width/2) && ( this.x  < obj.x + obj.Width/2) && (this.y - 100 < obj.y + obj.Height)){
		return true;
	}else
		return false;	 
}


Hero.prototype.collidesWith = function(obj){
	
	if (this.shieldPower && obj.isObstacle){
		if ( (this.x + this.Width > obj.x + obj.Width/2) && ( this.x  < obj.x + obj.Width/2) && (this.y < obj.y + obj.Height)) {
			obj.y = commonConfiguration.YUpperLimit;
			obj.isVisible = false;
			this.sheildPowerCtr = -2;
		}
		return false;
	}

	if ( (this.x + this.Width > obj.x + obj.Width/2) && ( this.x  < obj.x + obj.Width/2) && (this.y < obj.y + obj.Height)) {
		return true;
	}
	
	return false;		
}