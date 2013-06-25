fps                 = 1000/40;
canvas              = document.getElementById("gameCanvas");
context 			= canvas.getContext("2d");
var hero 			= null;
var background		= null;
var numberOfFrame   = 0;
var speedController = 5;

function paint(){

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#6b92b9";
	context.fillRect(0, 0, canvas.width , canvas.height);
	background.paint(context);
	hero.paint(context);


}



function update(){
	numberOfFrame++;
	paint()


}






function initGameScene(){

	//Sprite(positionX, positionY, imageUrl, isVisible, frameCount, isAnimated)
	
	
	background = new Sprite(100, 0, "/game/gameBG.jpg", true, 1, false);

	leftRamp_1 = new Sprite(100, 0, "/game/ramp_l.png", true, 1, false);
	leftRamp_2 = new Sprite(-100, 0, "/game/ramp_l.png", true, 1, false);

	hero =  new Hero(100, 100, "/game/bhero.png", true, 32, true , {x : 10 ,y : 0});
	hero.currentFrame   = 0;
	hero.startAnimIndex = 20; // to change animation in a image
	hero.frameThreshold = 4; // number of frame in animation
	
	
	canvas.height = window.innerHeight;
	canvas.width  = window.innerWidth;





	(function animloop(){
						requestAnimFrame(animloop);  // equal to the set Interval
						update();
					})();



}

window.requestAnimFrame = (function(){
					return  window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame    ||
							window.oRequestAnimationFrame      ||
							window.msRequestAnimationFrame     ||
							function( callback ){
								window.setTimeout(callback, fps);
							};
				})();


window.onload = initGameScene();