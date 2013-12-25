
function HeroParticleSystem(centre, count, rgb){
 this.base = ParticleSystem;
 this.base(centre, count, rgb);
}

HeroParticleSystem.prototype = Object.create(ParticleSystem.prototype);

HeroParticleSystem.prototype.create_particle = function(centre, rgb){
  
	ParticleSystem.prototype.create_particle.call(this,centre, rgb);
    this.vx = Math.random()*3 - 3;
	this.vy = Math.random()*5 + 2;
	//Random size
	this.radius = Math.random()*2 + 2;

}

HeroParticleSystem.prototype.update = function(){

	for (var counter = 0; counter < this.count; counter++){
		var particle = this.ParticleSystemObject[counter];
		if (particle.y > 640 ){
				particle.y = spriteVariables.hero.y + 40;
				if (spriteVariables.hero.isLeft)
					particle.x = spriteVariables.hero.x + 10;
				else 
					particle.x = spriteVariables.hero.x + 30;
			}
		else{ 
				if (spriteVariables.hero.isLeft){
					particle.x -= particle.vx;
				}
				else{
					particle.x += particle.vx;	
				}
				particle.y += particle.vy;
		}	
	}
}
