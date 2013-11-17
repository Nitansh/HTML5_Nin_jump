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
	

	gameManager = new GameManager(spriteVariables);
	menuManager = new MenuManager(menuVariables);
	menuManager.paint();
	//gameManager.initGameScene();


	window.addEventListener("click", getInput, true);
};

function getInput(event){
		spriteVariables.hero.onInput(event);
}