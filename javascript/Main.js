/***************************************************************************
*
*	Function Name :  onLoad
*	Description   :  This is the overall starting point to the game.
*	Input 		  :  Nothing
*	Outputs 	  :  Overall Game
*
***************************************************************************/

window.onload = function(){
	
	gameManager = new GameManager(spriteVariables);
	gameManager.initGameScene();

	window.addEventListener("click", getInput, true);
};

function getInput(event){
		spriteVariables.hero.onInput(event);
}