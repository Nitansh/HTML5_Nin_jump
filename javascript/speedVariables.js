function SpeedVariables() {
	this.numberOfFrame   = 0;
	this.speedController = 3;
	this.objectFrequency = 35;
	this.startRandomIndex= 100;
	this.monkeyProb      = 50;
	this.halloweenProb   = 50;
	this.coinProb        = 20;
	this.void_obj        = 10;
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