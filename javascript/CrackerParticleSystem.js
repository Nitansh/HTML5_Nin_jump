/*************************************
This File handles the Cracker particle system in the game.

we just have to instatiate the cracker object in our Sprite variables


**************************************/

/****************
Performance Issues need to resolve
*****************/

fireworks = [];
particles = [];
		
function Cracker(){
		this.ctx = document.getElementById("gameCanvas").getContext( '2d' );
		// firework collection
		// particle collection
		
		// starting hue
		this.hue = 120;
		// this will time the auto launches of fireworks, one launch per 80 loop ticks
		this.timerTotal = 80;
		this.timerTick = 0;
		this.cw  = 320;
		this.ch   = 640;
}

Cracker.prototype.random = function( min, max ) {
	return Math.random() * ( max - min ) + min;
}

// calculate the distance between two points
Cracker.prototype.calculateDistance =  function( p1x, p1y, p2x, p2y ) {
	var xDistance = p1x - p2x,
			yDistance = p1y - p2y;
	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

// create firework
function Firework( sx, sy, tx, ty ) {
	// actual coordinates
	this.x = sx;
	this.y = sy;
	// starting coordinates
	this.sx = sx;
	this.sy = sy;
	// target coordinates
	this.tx = tx;
	this.ty = ty;
	
	// distance from starting point to target
	this.distanceToTarget = Cracker.prototype.calculateDistance.call(this,sx, sy, tx, ty );
	this.distanceTraveled = 0;
	// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 3;
	// populate initial coordinate collection with the current coordinates
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	this.angle = Math.atan2( ty - sy, tx - sx );
	this.speed = 1;
	this.acceleration = 1.05;
	this.brightness = Cracker.prototype.random.call(this, 50, 70 );
	// circle target indicator radius
	this.targetRadius = 1;
}

// update firework
Firework.prototype.update = function( index, hue) {
	// remove last item in coordinates array
	var i = particles.length;
	while( i-- ) {
		particles[ i ].update( i );
	}

	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	
	// cycle the circle target indicator radius
	if( this.targetRadius < 8 ) {
		this.targetRadius += 0.3;
	} else {
		this.targetRadius = 1;
	}
	
	// speed up the firework
	this.speed *= this.acceleration;
	
	// get the current velocities based on angle and speed
	var vx = Math.cos( this.angle ) * this.speed,
			vy = Math.sin( this.angle ) * this.speed;
	// how far will the firework have traveled with velocities applied?
	this.distanceTraveled = Cracker.prototype.calculateDistance.call(this,this.sx, this.sy, this.x + vx, this.y + vy );
	
	// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
	if( this.distanceTraveled >= this.distanceToTarget ) {
		this.createParticles( this.tx, this.ty , hue);
		// remove the firework, use the index passed into the update function to determine which to remove
		fireworks.splice( index, 1 );
	} else {
		// target not reached, keep traveling
		this.x += vx;
		this.y += vy;
	}
}

// draw firework
Firework.prototype.draw = function(ctx, hue) {

	var i = particles.length;
	while( i-- ) {
		particles[ i ].draw( ctx);
	}
	
	var temp_composite      = ctx.globalCompositeOperation;
	var temp_fillStyle      = ctx.fillStyle;
	
	ctx.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	//ctx.fillRect( 0, 0, cw, ch );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	ctx.globalCompositeOperation = 'lighter';
	ctx.beginPath();
	// move to the last tracked coordinate in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
	ctx.lineTo( this.x, this.y );
	ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
	ctx.stroke();

	ctx.globalCompositeOperation = temp_composite;
	ctx.fillStyle = temp_fillStyle;
}

// create particle
function Particle( x, y , hue) {
	this.x = x;
	this.y = y;
	// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 5;
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	// set a window.random1 angle in all possible directions, in radians
	this.angle = Cracker.prototype.random.call(this, 0, Math.PI * 2 );
	this.speed = Cracker.prototype.random.call(this, 1, 10 );
	// friction will slow the particle down
	this.friction = 0.95;
	// gravity will be applied and pull the particle down
	this.gravity = 1;
	// set the hue to a window.random1 number +-20 of the overall hue variable
	this.hue = Cracker.prototype.random.call(this,hue - 20, hue + 20 );
	this.brightness = Cracker.prototype.random.call(this, 50, 80 );
	this.alpha = 1;
	// set how fast the particle fades out
	this.decay = Cracker.prototype.random.call(this, 0.015, 0.03 );
}

// update particle
Particle.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	// slow down the particle
	this.speed *= this.friction;
	// apply velocity
	this.x += Math.cos( this.angle ) * this.speed;
	this.y += Math.sin( this.angle ) * this.speed + this.gravity;
	// fade out the particle
	this.alpha -= this.decay;
	
	// remove the particle once the alpha is low enough, based on the passed in index
	if( this.alpha <= this.decay ) {
		particles.splice( index, 1 );
	}
}

// draw particle
Particle.prototype.draw = function(ctx) {
	var temp_composite      = ctx.globalCompositeOperation;
	var temp_fillStyle      = ctx.fillStyle;
	ctx.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	//ctx.fillRect( 0, 0, cw, ch );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	ctx.globalCompositeOperation = 'lighter';

	ctx. beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx.lineTo( this.x, this.y );
	ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx.stroke();

    ctx.globalCompositeOperation = temp_composite;
	ctx.fillStyle = temp_fillStyle;

}

// create particle group/explosion
Firework.prototype.createParticles= function( x, y ) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	var particleCount = 30;
	while( particleCount-- ) {
		particles.push( new Particle( x, y ) );
	}
}

// main demo loop
 Cracker.prototype.update= function() {
	
	// increase the hue to get different colored fireworks over time
	this.hue += 0.5;
	
	var i = fireworks.length;
	while( i-- ) {
		fireworks[ i ].update( i , this.hue);
	}
	
	if( this.timerTick >= this.timerTotal ) {
			// start the firework at the bottom middle of the screen, then set the window.random1 target coordinates, the window.random1 y coordinates will be set within the range of the top half of the screen
			var i = Cracker.prototype.random.call(this, 30, this.cw - 30 );
			var j = Cracker.prototype.random.call(this, 0, this.ch / 2 ); 
			fireworks.push( new Firework( this.cw / 2, this.ch - 50 , i, j) );
			this.timerTick = 0;
	}
	this.timerTick++;
}

Cracker.prototype.paint = function(){

	var temp_composite      = this.ctx.globalCompositeOperation;
	var temp_fillStyle      = this.ctx.fillStyle;
	

	var i = fireworks.length;
	while( i-- ) {
		fireworks[ i ].draw(this.ctx, this.hue);
	}
	
	this.ctx.globalCompositeOperation = temp_composite;
	this.ctx.fillStyle = temp_fillStyle;
}