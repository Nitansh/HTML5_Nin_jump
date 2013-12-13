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
	radio('MenuManagerStateUpdate').subscribe([menuManager.stateChanger,menuManager]);
	radio('GameManagerStateUpdate').subscribe([gameManager.stateChanger,gameManager]);

	menuManager.paint();

	window.addEventListener("click", getInput, true);
};

function getInput(event){

		var state = null;
		if (!menuManager.state.localeCompare('play') || !menuManager.state.localeCompare('resumed'))
			spriteVariables.hero.onInput(event);

			if(spriteVariables.backButton.isVisible && spriteVariables.backButton.Clicked(event))
			{	
				state = 'pause';
				radio('MenuManagerStateUpdate').broadcast(state);
				radio('GameManagerStateUpdate').broadcast(state);			
			}

		else {

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
			}
				radio('MenuManagerStateUpdate').broadcast(state);
				radio('GameManagerStateUpdate').broadcast(state);
		}		
		 
}