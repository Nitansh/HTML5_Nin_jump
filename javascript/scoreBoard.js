function ScoreBoard(){
	this.ScoreBoardElement   = document.getElementById('scoreboard');
	this.autoPilotBar        = document.getElementById('AutoPilotBar');
	this.myScore             = document.getElementById('myScore');
	this.myHighScore         = document.getElementById('myHighScore');
	this.myCointCount        = document.getElementById('myCoins');
	this.myMultiplier        = document.getElementById('myMultiplier');
}

ScoreBoard.prototype.toggleClass = function(){
	this.ScoreBoardElement.classList.toggle('dormat');
}

ScoreBoard.prototype.SetHtml = function(HTMLElement, value){
	HTMLElement.innerHTML = value;
}

ScoreBoard.prototype.GetHtml = function(HTMLElement){
	return parseInt(HTMLElement.innerHTML);
}

ScoreBoard.prototype.updateAutoPilotBar = function(){
	if (speedVariables.numberOfFrame % 100 == 0 && (this.autoPilotBar.max >= this.autoPilotBar.value)){
		this.autoPilotBar.value++;
	}
}

ScoreBoard.prototype.updateMyScore = function(){
	var value = this.GetHtml(this.myScore) + this.GetHtml(this.myMultiplier);
	this.SetHtml(this.myScore,value);
}


ScoreBoard.prototype.updateMyCoinCount = function(){
	var value = this.GetHtml(this.myCointCount) + 1;
	this.SetHtml(this.myCointCount, value);
}

ScoreBoard.prototype.updateMyMultiplier = function(){
	var value = this.GetHtml(this.myMultiplier) + 1;
	this.SetHtml(this.myMultiplier, value);
}

ScoreBoard.prototype.update = function(){
	this.updateMyScore();
	this.SetHtml(this.myHighScore, localStorage.highScore);
	this.updateHighScore();
	this.updateAutoPilotBar();
}

ScoreBoard.prototype.updateHighScore = function(){
	if (typeof (Storage) !== undefined){
		if (this.GetHtml(this.myScore) >= parseInt(localStorage.highScore) || localStorage.highScore === undefined){
			localStorage.highScore = this.GetHtml(this.myScore);
		}
	}else{
			alert('we have to use phonegap technique')
	}
}

ScoreBoard.prototype.updateTotalCoinCount = function(){
	if (typeof (Storage) !== undefined){
			if  (localStorage.coinCount === undefined)
				localStorage.coinCount = this.GetHtml(this.myCointCount);
			else
				localStorage.coinCount = parseInt(localStorage.coinCount) + this.GetHtml(this.myCointCount); 
		}else{
			alert('we have to use phonegap technique')
		}
			
}

ScoreBoard.prototype.updateScoreOnGameEnd = function(){
	this.SetHtml(this.myScore, 0);
	this.updateTotalCoinCount();
	this.SetHtml(this.myCointCount, 0);
	this.updateHighScore();
	this.autoPilotBar.value = 0;
}