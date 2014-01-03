function SnowParticleSystem(Dim, count, rgb){
 this.angle = 0;
 this.count = count; 
 this.Dim   = Dim;
 this.base = ParticleSystem;
 this.base(Dim, count, rgb);
}

SnowParticleSystem.prototype = Object.create(ParticleSystem.prototype);

SnowParticleSystem.prototype.create_particle = function(Dim, rgb){
        
        this.x = Math.random()*(Dim.x); //x-coordinate
		this.y = Math.random()*(Dim.y); //y-coordinate
		this.radius =  (Math.random()*4)+1; //radius
		this.d = Math.random()*(25); //density
		this.color = "rgba("+rgb.red+", "+rgb.green+", "+rgb.blue+", 0.9)";
}

SnowParticleSystem.prototype.update = function(){

	this.angle += 0.01;
	for (var counter = 0; counter < this.count; counter++){
		var p = this.ParticleSystemObject[counter];
			//Lets make it more random by adding in the radius
		p.y += Math.cos(this.angle+p.d) + 1 + p.radius/2;
		p.x += Math.sin(this.angle) * 2;
		
		//Sending flakes back from the top when it exits
		//Lets make it a bit more organic and let flakes enter from the left and right also.
		if(p.x > this.Dim.x + 5 || p.x < -5 || p.y > this.Dim.y)
		{
			if(counter%3 > 0) //66.67% of the flakes
			{
				this.ParticleSystemObject[counter] = {x: Math.random()*this.Dim.x, y: -10, radius: p.radius, d: p.d, color: p.color};
			}
			else
			{
				//If the flake is exitting from the right
				if(Math.sin(this.angle) > 0)
				{
					//Enter from the left
					this.ParticleSystemObject[counter] = {x: -5, y: Math.random()*this.Dim.y, radius: p.radius, d: p.d, color: p.color};
				}
			}
		}
	}
}
