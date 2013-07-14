var spriteVariables = {
	//Sprite(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated)
	background :  new Sprite(0, 0, "/game/gameBG.jpg", true, 1, 0, false),
	leftRamp1  :  new Ramp(0, -640, "/game/ramp_l.png", true, 1, 0, false , {x : 0 ,y : 10}),
	leftRamp2  :  new Ramp(0, 0, "/game/ramp_l.png", true, 1, 0, false, {x : 0 ,y : 10}),	
	rightRamp1 :  new Ramp((360 - 30), -640 , "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : 10}),
	rightRamp2 :  new Ramp((360 - 30), 0, "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : 10}),
	hero       :  new Hero((360 - 30 - 40), 500, "/game/bhero.png", true, 32, 0, true , {x : 6 ,y : 0}),
	coin       :  new Coin((360 - 30 - 40), 0, "/game/coin_Anim.png", true, 8, 8, true , {x : 0 ,y : 2})		
};

console.log(spriteVariables.hero.x)