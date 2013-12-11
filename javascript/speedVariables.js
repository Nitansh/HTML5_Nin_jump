function SpeedVariables() {
	this.numberOfFrame   = 0;
	this.speedController = 5;
	this.objectFrequency = 20;
	this.startRandomIndex= 100;
	this.monkeyProb      = 30;
	this.halloweenProb   = 20;
	this.coinProb        = 40;
	this.coinCount       = 4;
	this.coinInProgess   =false;
    this.coinCount       = 4;
	this.coinIndex       = 0;
	this.globalSpeedY    = 10; 
	this.fps             = 1000/60;
	this.heroDied        = false;
};

var speedVariables = new SpeedVariables();