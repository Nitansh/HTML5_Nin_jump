/***************************************************************************
*
*	Function Name :  onLoad
*	Description   :  This is the overall starting point to the game.
*	Input 		  :  Nothing
*	Outputs 	  :  Overall Game
*
***************************************************************************/

window.onload = function(){
	
	// should be done at time of initialization :)
	Globalcanvas        = document.getElementById("gameCanvas");
	Globalcontext       = Globalcanvas.getContext("2d");
	Globalcanvas.height = window.innerHeight;
	Globalcanvas.width  = window.innerWidth;	
	soundOn             = true;
	gameOn              = true;

	gameManager = new GameManager(spriteVariables);
	menuManager = new MenuManager(menuVariables);

	// Pubsub subscription
	radio('MenuManagerStateUpdate').subscribe([menuManager.stateChanger, menuManager]);
	radio('GameManagerStateUpdate').subscribe([gameManager.stateChanger, gameManager]);
	radio('GameOn').subscribe([gameManager.initGameScene, gameManager]);
	radio('HeroDieing').subscribe([gameManager.speedToggle, gameManager]);
	radio('HeroDied').subscribe([gameManager.speedToggle, gameManager],[gameManager.boolToggle, gameManager]);
	radio('TogglePauseButton').subscribe([gameManager.pauseVisiblityToggle,gameManager]);
	radio('HeroRocketPower').subscribe([spriteVariables.rocketHero.visiblityToggle, spriteVariables.rocketHero]);
	radio('HeroShieldOn').subscribe([spriteVariables.heroSheild.visiblityToggle, spriteVariables.heroSheild]);
	radio('UpdateScoreOnGameEnd').subscribe([spriteVariables.scoreBoard.updateScoreOnGameEnd, spriteVariables.scoreBoard],[spriteVariables.scoreBoard.toggleClass, spriteVariables.scoreBoard]);
	radio('UpdateCoinCount').subscribe([spriteVariables.scoreBoard.updateMyCoinCount, spriteVariables.scoreBoard]);
	radio('ToggleScoreBoardClass').subscribe([spriteVariables.scoreBoard.toggleClass, spriteVariables.scoreBoard]);
	radio('ApplyDormatClassToMeters').subscribe([spriteVariables.scoreBoard.applyDormatClass, spriteVariables.scoreBoard]);
	radio('RemoveDormatClassFromMetere').subscribe([spriteVariables.scoreBoard.removeDormatClass, spriteVariables.scoreBoard]);
	menuManager.paint();
	window.addEventListener("click", getInput, false);
};

function getInput(event){

		event.preventDefault();
		var state = null;
		if (0 == menuManager.state.localeCompare('play') || 0 == menuManager.state.localeCompare('resumed')){
				spriteVariables.hero.onInput(event);

				if(spriteVariables.backButton.isVisible && !spriteVariables.hero.heroFalling && spriteVariables.backButton.Clicked(event))
				{	
					state = 'pause';
					radio('MenuManagerStateUpdate').broadcast(state);
					radio('GameManagerStateUpdate').broadcast(state);			
				}
			}else {
				if(menuVariables.main_menu.isVisible && menuVariables.main_menu.Clicked(event)){
					state = 'menu';
					// Make the Hero fall so we can reuse the previous code and logic
					radio('HeroDieing').broadcast();
					speedVariables.heroDied =  true;
					radio('HeroDied').broadcast();
				}
				if(menuVariables.backButton.isVisible && menuVariables.backButton.Clicked(event)){
					state = 'menu';
					radio('ApplyDormatClassToMeters').broadcast();
				}
				if(menuVariables.helpButton.isVisible && menuVariables.helpButton.Clicked(event)){
					state = 'help';
				}		
				if(menuVariables.aboutButton.isVisible && menuVariables.aboutButton.Clicked(event)){
					state = 'about';
					radio('RemoveDormatClassFromMetere').broadcast();
				}
		  		if(menuVariables.playButton.isVisible && menuVariables.playButton.Clicked(event)){			
					state = 'play';
					radio('ToggleScoreBoardClass').broadcast();
				}
				if(menuVariables.resumeButton.isVisible && menuVariables.resumeButton.Clicked(event)){
					state = 'resumed';
				}
				if(menuVariables.soundButton.isVisible && menuVariables.soundButton.Clicked(event)){
					soundOn = !soundOn;	
					state = 'menu';
				}

				if (null !=  state){ 
					radio('MenuManagerStateUpdate').broadcast(state);
			    	radio('GameManagerStateUpdate').broadcast(state);
			    }
		}		
		 
		event.preventDefault();
}

// event for the meter scoreBoard

rocketMeterUpdate = function(){
	if (parseInt(spriteVariables.scoreBoard.rocketMeterCoins.innerHTML) < parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)){
		var value = parseInt(localStorage.RocketMeter);
		value++;
		localStorage.RocketMeter = value;
		spriteVariables.scoreBoard.updateTotalCoinCountAfterPowerUp(localStorage.RocketMeter, value*100);
		spriteVariables.scoreBoard.updateMetreScoreBoard();
	}else{
		alert('You need ' + (parseInt(spriteVariables.scoreBoard.rocketMeterCoins.innerHTML) - parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)) +  ' coins to update');
	}
}

shieldMeterUpdate = function(){
	if (parseInt(spriteVariables.scoreBoard.shieldMeterCoins.innerHTML) < parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)){
		var value = parseInt(localStorage.shieldMeter);
		value++;
		localStorage.shieldMeter = value;
		spriteVariables.scoreBoard.updateTotalCoinCountAfterPowerUp(localStorage.shieldMeter, value*100);
		spriteVariables.scoreBoard.updateMetreScoreBoard();
	}else{
		alert('You need ' + (parseInt(spriteVariables.scoreBoard.shieldMeterCoins.innerHTML) - parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)) +  ' coins to update');
	}
}

autoPlitotMeterUpadate = function(){
	if (parseInt(spriteVariables.scoreBoard.autoPlitotMeterCoins.innerHTML) < parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)){
		var value = parseInt(localStorage.autoPlitotMeter);
		value++;
		localStorage.autoPlitotMeter = value;
		spriteVariables.scoreBoard.updateTotalCoinCountAfterPowerUp(localStorage.autoPlitotMeter, value*100);
		spriteVariables.scoreBoard.updateMetreScoreBoard();
	}else{
		alert('You need ' + (parseInt(spriteVariables.scoreBoard.autoPlitotMeterCoins.innerHTML) - parseInt(spriteVariables.scoreBoard.totalCoins.innerHTML)) +  ' coins to update');
	}
}