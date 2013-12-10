function MenuManager(menuVariables){
	this.canvas              = Globalcanvas;
	this.context 			 = Globalcontext;
	this.state               = 'menu';
	this.menuVariables       = menuVariables;

}


MenuManager.prototype.paint = function() {
	
	this.clearScreen();
	for (var menuObject in this.menuVariables){
		if (this.menuVariables[menuObject].length){
					for (var ctr_type = 0; ctr_type < this.menuVariables[menuObject].length; ctr_type++){
						for (var ctr_no = 0; ctr_no < this.menuVariables[menuObject][ctr_type].length; ctr_no++){
							// paint function
							this.menuVariables[menuObject][ctr_type][ctr_no].paint(this.context);
						}
					}
		}else{
			   this.menuVariables[menuObject].paint(this.context);			
		 }
	}
}

MenuManager.prototype.clearScreen = function(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillStyle = "#6b92b9";
	this.context.fillRect(0, 0, this.canvas.width , this.canvas.height);
	
}

MenuManager.prototype.stateController = function(){

 if (!this.state.localeCompare('pause')){
 	menuVariables.backButton.isVisible  = false ;
	menuVariables.playButton.isVisible  = false;
	menuVariables.soundButton.isVisible = true;
	menuVariables.helpButton.isVisible  = true ;
	menuVariables.aboutButton.isVisible = true;
	menuVariables.aboutText.isVisible   = false;
	menuVariables.helpText.isVisible    = false;
	menuVariables.resumeButton.isVisible= true; 
 
 }


 if (!this.state.localeCompare('menu')) {
 	menuVariables.backButton.isVisible  = false ;
	menuVariables.playButton.isVisible = true;
	menuVariables.soundButton.isVisible = true;
	menuVariables.helpButton.isVisible  = true ;
	menuVariables.aboutButton.isVisible = true;
	menuVariables.aboutText.isVisible   = false;
	menuVariables.helpText.isVisible    = false;
	menuVariables.resumeButton.isVisible= false; 
 }

 if (!this.state.localeCompare('help')){
 	menuVariables.backButton.isVisible  = true ;
	menuVariables.playButton.isVisible  = false;
	menuVariables.soundButton.isVisible = false;
	menuVariables.helpButton.isVisible  = false;
	menuVariables.aboutButton.isVisible = false;
	menuVariables.aboutText.isVisible   = false;
	menuVariables.helpText.isVisible    = true;
	menuVariables.resumeButton.isVisible= false; 

 }

 if (!this.state.localeCompare('about')){
 	menuVariables.backButton.isVisible  = true ;
	menuVariables.playButton.isVisible  = false;
	menuVariables.soundButton.isVisible = false;
	menuVariables.helpButton.isVisible  = false;
	menuVariables.aboutButton.isVisible = false;
	menuVariables.aboutText.isVisible   = true;
	menuVariables.helpText.isVisible    = false;
	menuVariables.resumeButton.isVisible= false; 

 }

if (!this.state.localeCompare('play') && gameOn ){
	spriteVariables.hero = null;
	spriteVariables.hero = new Hero((360 - 30 - 40), 500, "/game/bhero.png", true, 32, 0, true , {x : 8 ,y : 0})
	gameOn = !gameOn;
	if (!gameManager.isOn)
		gameManager.initGameScene();
}

if (!this.state.localeCompare('resumed')){
	// do nothing only state comparison will do the rest :) :D 3:)
}

  this.paint();
}

