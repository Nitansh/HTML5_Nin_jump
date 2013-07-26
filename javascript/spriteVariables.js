function arrayObject (){
	this.monkeyObject     =  new Array();
	this.halloweenObject  = new Array();
	this.coinObject       =  new Array();

	this.init();
};

arrayObject.prototype.init = function(){
	 ySpeed = .1,
	 m_1 = new Monkey(30, 0, "/game/monk.png", true, 4, 0, true , {x : 0 ,y : ySpeed});
	 h_1 = new Halloween(30, 100, "/game/hell2.png", true, 2, 0, true , {x : 0 ,y : ySpeed});
	 c_1 = new Coin((360 - 30 - 40), 0, "/game/coin_Anim.png", true, 8, 8, true , {x : 0 ,y :ySpeed }); 
	 m_2 = new Monkey((360 - 30 - 76), 0, "/game/monk2.png", true, 4, 0, true , {x : 0 ,y : ySpeed});
	 h_2 = new Halloween((360 - 30 - 55), 100, "/game/hell.png", true, 2, 0, true , {x : 0 ,y : ySpeed});
	for (var ctr = 0; ctr <= 5; ctr++){
		if (0 == ctr%2)
			this.monkeyObject.push(m_1);
		else
			this.monkeyObject.push(m_2);
	}
	
	for (var ctr = 0; ctr <= 5; ctr++){
		if (0 == ctr%2)
			this.halloweenObject.push(h_1);
		else
			this.halloweenObject.push(h_2);
	}
	
	for (var ctr = 0; ctr < 10; ctr++){
		this.coinObject.push(c_1);
	}
}

arrayO = new arrayObject();

var spriteVariables = {
	//Sprite(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated)
	background   :  new Sprite(0, 0, "/game/gameBG.jpg", true, 1, 0, false),
	leftRamp1    :  new Ramp(0, -640, "/game/ramp_l.png", true, 1, 0, false , {x : 0 ,y : 10}),
	leftRamp2    :  new Ramp(0, 0, "/game/ramp_l.png", true, 1, 0, false, {x : 0 ,y : 10}),	
	rightRamp1   :  new Ramp((360 - 30), -640 , "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : 10}),
	rightRamp2   :  new Ramp((360 - 30), 0, "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : 10}),
	hero         :  new Hero((360 - 30 - 40), 500, "/game/bhero.png", true, 32, 0, true , {x : 6 ,y : 0}),
	coin         :  arrayO.coinObject,
	monk         :  arrayO.monkeyObject,
	halloween    :  arrayO.halloweenObject
};


