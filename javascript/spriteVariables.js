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
	
	for (var ctr = 0; ctr < 20; ctr++){
		if ( ctr < 10)
			this.coinObject.push(new Coin((360 - 30 - 40), -100, "/game/coin_Anim.png", false, 8, 8, true , {x : 0 ,y :ySpeed }));
		else
			this.coinObject.push(new Coin(30, -100, "/game/coin_Anim.png", false, 8, 8, true , {x : 0 ,y :ySpeed }));
	}	
}

movable = new movableObject();


function SpriteVariables() {
	//Sprite(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated) generic code :D :D
	this.background   =  new Sprite(0, 0, "/game/gameBG.jpg", true, 1, 0, false);
	this.p2           =  new Cracker();
	this.leftRamp1    =  new Ramp(0, -640, "/game/ramp_l.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.leftRamp2    =  new Ramp(0, 0, "/game/ramp_l.png", true, 1, 0, false, {x : 0 ,y : speedVariables.globalSpeedY});
	this.rightRamp1   =  new Ramp((360 - 30), -640 , "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.rightRamp2   =  new Ramp((360 - 30), 0, "/game/ramp_r.png", true, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.hero         =  new Hero((360 - 30 - 40), 500, "/game/bhero.png", true, 32, 0, true , {x : 8 ,y : 0});
	this.backButton   =  new Sprite(360 - 19, 640 - 23, "/game/pause.png", true, 1, 0, false);
	this.movable      =  movable.objects;
	//this.p1           =  new HeroParticleSystem({x:360-30, y:500 + 40}, 50, {red:227, green:140, blue:45});
	//this.p3           =  new SnowParticleSystem({x:360, y:640}, 50, {red:248, green:248, blue:255});
	this.rocket       =  new Rocket((360 - 32)/2, -100, "/game/rocket.png", false, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.sheild       =  new Sheild((360 - 30 - 27), -120, "/game/sheild_icon.png", false, 1, 0, false , {x : 0 ,y : speedVariables.globalSpeedY});
	this.rocketHero   =  new RocketHero((360 - 32)/2, this.hero.y - 45 , "/game/hero_R.png",false, 2, 0, true,  {x : 5, y : 0});
	this.heroSheild   =  new HeroSheild(this.hero.x  - 100 , this.hero.y - 100, "/game/sheild.png", false, 1, 0, false); 
	// it is not sprite but will have the update function so can be called by the generic framework
	this.scoreBoard   = new ScoreBoard();		
};

SpriteVariables.prototype.SetPosition = function(){
	this.hero = null;
	this.hero = new Hero((360 - 30 - 40), 450, "/game/bhero.png", true, 32, 0, true , {x : 8 ,y : 0});

	for (var ctr = 0; ctr <= 5; ctr++){
		this.movable[0][ctr].y = -100;
		this.movable[0][ctr].isVisible = false;

		this.movable[1][ctr].y = -100;
		this.movable[1][ctr].isVisible = false;
	}

	for (var ctr = 0; ctr < 16; ctr++){
		this.movable[2][ctr].y = -100;
		this.movable[2][ctr].isVisible = false;
	}

	this.leftRamp2.y = 0;
	this.leftRamp1.y = -640;
	this.rightRamp2.y = 0;
	this.rightRamp1.y = -640;
}

var spriteVariables = new SpriteVariables();
