function movableObject (){
	this.monkeyObject     =  new Array();
	this.halloweenObject  =  new Array();
	this.coinObject       =  new Array();
	this.objects          =  new Array();

	this.init();
	this.makeObjectArray();
};


movableObject.prototype.makeObjectArray = function(){
	this.objects.push(this.monkeyObject);
	this.objects.push(this.halloweenObject);
	this.objects.push(this.coinObject);
}


movableObject.prototype.init = function(){
	 var ySpeed = speedVariables.globalSpeedY;
	 
	for (var ctr = 0; ctr <= 5; ctr++){
		if (0 == ctr%2)
			this.monkeyObject.push(new Monkey(30, -100, "/game/monk.png", false, 4, 0, true , {x : 0 ,y : ySpeed}));
		else
			this.monkeyObject.push(new Monkey((360 - 30 - 76), -100, "/game/monk2.png", false, 4, 0, true , {x : 0 ,y : ySpeed}));
	}
	
	for (var ctr = 0; ctr <= 5; ctr++){
		if (0 == ctr%2)
			this.halloweenObject.push(new Halloween(30, -100, "/game/hell2.png", false, 2, 0, true , {x : 0 ,y : ySpeed}));
		else
			this.halloweenObject.push(new Halloween((360 - 30 - 55), -100, "/game/hell.png", false, 2, 0, true , {x : 0 ,y : ySpeed}));
	}
	
	for (var ctr = 0; ctr < 16; ctr++){
		if ( ctr < 8)
			this.coinObject.push(new Coin((360 - 30 - 40), -100, "/game/coin_Anim.png", false, 8, 8, true , {x : 0 ,y :ySpeed }));
		else
			this.coinObject.push(new Coin(30, -100, "/game/coin_Anim.png", false, 8, 8, true , {x : 0 ,y :ySpeed }));
	}	
}

movable = new movableObject();


var spriteVariables = {
	//Sprite(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated) generic code :D :D
	//splashScreen :  new Sprite(0, 0, "/menu/splash.jpg", true, 1, 0, false),
	background   :  new Sprite(0, 0, "/game/gameBG.jpg", true, 1, 0, false),
	leftRamp1    :  new Ramp(0, -640, "/game/ramp_l.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY}),
	leftRamp2    :  new Ramp(0, 0, "/game/ramp_l.png", true, 1, 0, false, {x : 0 ,y : speedVariables.globalSpeedY}),	
	rightRamp1   :  new Ramp((360 - 30), -640 , "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY}),
	rightRamp2   :  new Ramp((360 - 30), 0, "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY}),
	hero         :  new Hero((360 - 30 - 40), 500, "/game/bhero.png", true, 32, 0, true , {x : 8 ,y : 0}),
	movable      :  movable.objects
};


