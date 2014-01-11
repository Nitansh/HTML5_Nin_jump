function SpeedVariables() {
	this.numberOfFrame   = 0;
	this.speedController = 5;
	this.objectFrequency = 50;
	this.startRandomIndex= 100;
	this.monkeyProb      = 2;
	this.halloweenProb   = 2;
	this.coinProb        = 2;
	this.void_obj        = 2;
	this.coinCount       = 5;
	this.coinInProgess   = false;
	this.coinIndex       = 0;
	this.globalSpeedY    = 10; 
	this.fps             = 1000/60;
	this.heroDied        = false;
};

var speedVariables = new SpeedVariables();