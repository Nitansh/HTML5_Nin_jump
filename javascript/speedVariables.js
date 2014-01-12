function SpeedVariables() {
	this.numberOfFrame   = 0;
	this.speedController = 5;
	this.objectFrequency = 50;
	this.startRandomIndex= 100;
	this.monkeyProb      = 5;
	this.halloweenProb   = 5;
	this.coinProb        = 5;
	this.void_obj        = 5;
	this.powerProb       = 5;
	this.coinCount       = 5;
	this.coinInProgess   = false;
	this.coinIndex       = 0;
	this.globalSpeedY    = 10; 
	this.fps             = 1000/60;
	this.heroDied        = false;
	this.rocketPowerCtr  = 500;
	this.sheildPowerCtr  = 500;
	this.autoPilotCtr    = 20;
};

var speedVariables = new SpeedVariables();