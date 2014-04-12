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
	 
	for (var ctr = 0; ctr <= commonConfiguration.monkeyHalfCount; ctr++){
		if (0 == ctr%2)
			this.monkeyObject.push(new Monkey(commonConfiguration.rampWidth, commonConfiguration.YUpperLimit, "/game/monk.png", false, 4, 0, true , {x : 0 ,y : ySpeed}));
		else
			this.monkeyObject.push(new Monkey((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - 76), commonConfiguration.YUpperLimit, "/game/monk2.png", false, 4, 0, true , {x : 0 ,y : ySpeed}));
	}
	
	for (var ctr = 0; ctr <= commonConfiguration.halloweenHalfCount; ctr++){
		if (0 == ctr%2)
			this.halloweenObject.push(new Halloween(commonConfiguration.rampWidth, commonConfiguration.YUpperLimit, "/game/hell2.png", false, 2, 0, true , {x : 0 ,y : ySpeed}));
		else
			this.halloweenObject.push(new Halloween((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - 55), commonConfiguration.YUpperLimit, "/game/hell.png", false, 2, 0, true , {x : 0 ,y : ySpeed}));
	}
	
	for (var ctr = 0; ctr < commonConfiguration.CoinFullCount; ctr++){
		if ( ctr < commonConfiguration.CoinFullCount/2)
			this.coinObject.push(new Coin((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - 40), commonConfiguration.YUpperLimit, "/game/coin_Anim.png", false, 8, 8, true , {x : 0 ,y :ySpeed }));
		else
			this.coinObject.push(new Coin(commonConfiguration.rampWidth, commonConfiguration.YUpperLimit, "/game/coin_Anim.png", false, 8, 8, true , {x : 0 ,y :ySpeed }));
	}	
}

movable = new movableObject();


function SpriteVariables() {
	//Sprite(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated) generic code :D :D
	this.background   =  new Sprite(0, 0, "/game/gameBG.jpg", true, 1, 0, false);
	this.p2           =  new Cracker();
	this.leftRamp1    =  new Ramp(0, -commonConfiguration.ClientHeight, "/game/ramp_l.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.leftRamp2    =  new Ramp(0, 0, "/game/ramp_l.png", true, 1, 0, false, {x : 0 ,y : speedVariables.globalSpeedY});
	this.rightRamp1   =  new Ramp((commonConfiguration.ClientWidth - commonConfiguration.rampWidth), -commonConfiguration.ClientHeight , "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.rightRamp2   =  new Ramp((commonConfiguration.ClientWidth - commonConfiguration.rampWidth), 0, "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.hero         =  new Hero((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - this.Height), 500, "/game/bhero.png", true, 32, 0, true , {x : 8 ,y : 0});
	this.backButton   =  new Sprite(commonConfiguration.ClientWidth - 20, commonConfiguration.ClientHeight - 20, "/game/pause.png", true, 1, 0, false);
	this.movable      =  movable.objects;
	this.p1           =  new HeroParticleSystem({x:commonConfiguration.ClientWidth-commonConfiguration.rampWidth, y:500 + 40}, 50, {red:227, green:140, blue:45});
	this.p3           =  new SnowParticleSystem({x:commonConfiguration.ClientWidth, y:commonConfiguration.ClientHeight}, 50, {red:227, green:140, blue:45});
	this.rocket       =  new Rocket((commonConfiguration.ClientWidth - this.Width)/2, commonConfiguration.YUpperLimit, "/game/rocket.png", false, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.sheild       =  new Sheild((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - this.Width), commonConfiguration.YUpperLimit - this.Height, "/game/sheild_icon.png", false, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.rocketHero   =  new RocketHero((commonConfiguration.ClientWidth - this.Width)/2, this.hero.y - this.Height , "/game/hero_R.png",false, 2, 0, true,  {x : 5, y : 0});
	this.heroSheild   =  new HeroSheild(this.hero.x  - 100 , this.hero.y - 100, "/game/sheild.png", false, 1, 0, false); 
	// it is not sprite but will have the update function so can be called by the generic framework
	this.scoreBoard   = new ScoreBoard();		
};

SpriteVariables.prototype.SetPosition = function(){
	this.hero = null;
	this.hero = new Hero((commonConfiguration.ClientWidth - commonConfiguration.rampWidth - 40), 500, "/game/bhero.png", true, 32, 0, true , {x : 8 ,y : 0});

	for (var ctr = 0; ctr <= commonConfiguration.monkeyHalfCount; ctr++){
		this.movable[0][ctr].y = commonConfiguration.YUpperLimit;
		this.movable[0][ctr].isVisible = false;

		this.movable[1][ctr].y = commonConfiguration.YUpperLimit;
		this.movable[1][ctr].isVisible = false;
	}

	for (var ctr = 0; ctr < commonConfiguration.CoinFullCount; ctr++){
		this.movable[2][ctr].y = commonConfiguration.YUpperLimit;
		this.movable[2][ctr].isVisible = false;
	}

	this.leftRamp2.y = 0;
	this.leftRamp1.y = -commonConfiguration.ClientHeight;
	this.rightRamp2.y = 0;
	this.rightRamp1.y = -commonConfiguration.ClientHeight;
}

var spriteVariables = new SpriteVariables();
