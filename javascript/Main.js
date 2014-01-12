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
	menuManager.paint();

	window.addEventListener("click", getInput, false);
};

function getInput(event){

		event.preventDefault();
		var state = null;
		if (menuManager.state.localeCompare('play') || menuManager.state.localeCompare('resumed'))
			spriteVariables.hero.onInput(event);

			if(spriteVariables.backButton.isVisible && !spriteVariables.hero.heroFalling && spriteVariables.backButton.Clicked(event))
			{	
				state = 'pause';
				radio('MenuManagerStateUpdate').broadcast(state);
				radio('GameManagerStateUpdate').broadcast(state);			
			}

		else {
			if(menuVariables.main_menu.isVisible && menuVariables.main_menu.Clicked(event)){
				state = 'menu';
				// Make the Hero fall so we can reuse the previous code and logic
				radio('HeroDieing').broadcast();
				speedVariables.heroDied =  true;
				radio('HeroDied').broadcast();
			}
			if(menuVariables.backButton.isVisible && menuVariables.backButton.Clicked(event)){
				state = 'menu';
			}
			if(menuVariables.helpButton.isVisible && menuVariables.helpButton.Clicked(event)){
				state = 'help';
			}		
			if(menuVariables.aboutButton.isVisible && menuVariables.aboutButton.Clicked(event)){
				state = 'about';
			}
	  		if(menuVariables.playButton.isVisible && menuVariables.playButton.Clicked(event)){			
				state = 'play';
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