function MenuManager(menuVariables){
	this.canvas              = Globalcanvas;
	this.context 			 = Globalcontext;
	this.state               = 'menu';
	this.menuVariables       = menuVariables;
	this.pauseState 		 = [false,true, false, false, false, false, false, false, false, true, true];
	this.menuState  		 = [true, true, false, true, true, true, true, false, false, false,   false];
	this.helpState  		 = [true, true, true, false, false, false, false, false, true, false, false];
	this.aboutState  		 = [true, true, true, false, false, false, false, true, false, false, false];
}


MenuManager.prototype.paint = function() {
	if (this.state != 'pause')
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
 
 	if(soundOn){
		menuVariables.soundButton.currentFrame = 0;
 	}else{
 		menuVariables.soundButton.currentFrame = 1;
 	} 
 

 	if (!this.state.localeCompare('pause')){
 	 	this.stateApply(this.pauseState);
 	}

 	if (!this.state.localeCompare('menu')) {
 		this.stateApply(this.menuState);	
 	}

 	if (!this.state.localeCompare('help')){
 		this.stateApply(this.helpState)	
 	}

 	if (!this.state.localeCompare('about')){
 		this.stateApply(this.aboutState)
 	}

	if (!this.state.localeCompare('play') && gameOn ){
		gameOn = !gameOn;
		radio('GameOn').broadcast();
	}

  this.paint();
}

/* 
 * for changing the state of game using pubsub arg will be state
 */

MenuManager.prototype.stateChanger =  function(state){
	this.state = state;
	this.stateController();
}

 /* 
  * paint only that sprite which is visible :) 
  */

MenuManager.prototype.stateApply = function(array){
	var counter = 0;
	for (var menuObject in this.menuVariables){
		if (this.menuVariables[menuObject].length){
					for (var ctr_type = 0; ctr_type < this.menuVariables[menuObject].length; ctr_type++){
						for (var ctr_no = 0; ctr_no < this.menuVariables[menuObject][ctr_type].length; ctr_no++){
							// paint function
							this.menuVariables[menuObject][ctr_type][ctr_no].isVisible = array[counter];
						}
					}
		}else{
			   this.menuVariables[menuObject].isVisible = array[counter];			
		 }
		 counter++;
	}
}


