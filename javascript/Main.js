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

	gameManager = new GameManager(spriteVariables);
	menuManager = new MenuManager(menuVariables);
	menuManager.paint();

	window.addEventListener("click", getInput, true);
};

function getInput(event){

		if (!menuManager.state.localeCompare('play') || !menuManager.state.localeCompare('resumed'))
			spriteVariables.hero.onInput(event);

			if(spriteVariables.backButton.isVisible && spriteVariables.backButton.Clicked(event))
			{	
				menuManager.state = 'pause';
				gameManager.state = 'pause';
				menuManager.stateController();
			}

		else {

			if(menuVariables.backButton.isVisible && menuVariables.backButton.Clicked(event)){
					menuManager.state = 'menu';
					gameManager.state = 'menu';
			}
			if(menuVariables.helpButton.isVisible && menuVariables.helpButton.Clicked(event)){
					menuManager.state = 'help';
					gameManager.state = 'help';
			}		
			if(menuVariables.aboutButton.isVisible && menuVariables.aboutButton.Clicked(event)){
					menuManager.state = 'about';
					gameManager.state = 'about';
			}
	  		if(menuVariables.playButton.isVisible && menuVariables.playButton.Clicked(event)){	
	  			if (!menuManager.state.localeCompare('menu')){		
					menuManager.state = 'play';
					gameManager.state = 'play';
				}else{
					menuManager.state = 'resumed';
					gameManager.state = 'resumed';
				}
			}
			if(menuVariables.soundButton.isVisible && menuVariables.soundButton.Clicked(event)){
				if (soundOn){
					soundOn = !soundOn;
					menuVariables.soundButton.currentFrame = 1;

				}else{
					soundOn = !soundOn;
					menuVariables.soundButton.currentFrame = 0;
				}
			}
			menuManager.stateController();
		}		
		 
}