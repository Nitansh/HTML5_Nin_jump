window.onload = function(){
	
	gameManager = new GameManager(spriteVariables);
	gameManager.initGameScene();

	window.addEventListener("click", getInput, true);
};

function getInput(event){
		spriteVariables.hero.onInput(event);
}