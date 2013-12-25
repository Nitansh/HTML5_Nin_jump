function ParticleSystem(centre, count , rgb){

	this.ParticleSystemObject = [];
	this.centre = centre;
	this.rgb = rgb;
	this.count = count;
	this.context = document.getElementById("gameCanvas").getContext('2d');
	this.init(this.centre, count)

}


ParticleSystem.prototype.init = function() {

	var self = this; 
	for (var counter = 0; counter < this.count; counter++ ){
		this.ParticleSystemObject.push(new self.create_particle(self.centre, self.rgb));
	}
		
};

ParticleSystem.prototype.create_particle = function(centre, rgb){
    this.x = centre.x;
    this.y = centre.y;
    this.isVisible = true;
	this.color = "rgba("+rgb.red+", "+rgb.green+", "+rgb.blue+", 0.9)";
}

ParticleSystem.prototype.update = function(){

	// overide the function in the base class	
}

ParticleSystem.prototype.paint = function(){
	
	// getting the default setting
	var temp_composite = this.context.globalCompositeOperation;
	var temp_fillStyle      = this.context.fillStyle;
	//Lets blend the particle with the BG
	this.context.globalCompositeOperation = "lighter";
	
	//Lets draw particles from the array now
	for(var counter = 0; counter < this.ParticleSystemObject.length; counter++)
	{
		var p = this.ParticleSystemObject[counter];
		
		this.context.beginPath();
		
		//Time for some colors
		var gradient = this.context.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
		//gradient.addColorStop(0.1, "black");
		gradient.addColorStop(0.9, p.color);
		
		this.context.fillStyle = gradient;
		this.context.arc(p.x, p.y, p.radius, Math.PI*2, false);
		this.context.fill();
	}
	// setting the deafult setting
	this.context.globalCompositeOperation = temp_composite;
	this.context.fillStyle = temp_fillStyle;

}
