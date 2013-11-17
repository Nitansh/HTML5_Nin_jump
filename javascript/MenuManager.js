function MenuManager(menuVariables){
	this.canvas              = Globalcanvas;
	this.context 			 = Globalcontext;
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