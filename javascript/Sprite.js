/***************************************************************
	Filename    :   Sprite.js

	Description :   Describe the whole object of sprite and the sprite 
					class is the most basic class which will be inherited
					by the all the objects used in the game.



*****************************************************************/

function Sprite(positionX, positionY, imageUrl, isVisible, frameCount, isAnimated){
				
					this.x                 = positionX;
					this.y                 = positionY; 
					this.imageSrc          = "../res" + imageUrl;
					this.isHit             = false;
					this.isVisible         = isVisible;
					this.Height            = 0;
					this.Width             = 0;
					this.isVisible         = isVisible;
					this.resolution        = 1;
					this.frameCount		   = frameCount;
					this.imageElement      = null;

					if (isAnimated){
						this.presentAnimation  = -1;
						this.isAnimated 	   = isAnimated;
						this.currentFrame      = 0;
						this.frameThreshold    = 1;
						this.startAnimIndex	   = 0;
					}
					this.init(this.imageSrc);
				}

				Sprite.prototype.init = function(imageUrl){
						if (undefined !=  imageUrl){
							this.imageElement        = new Image();
							this.imageElement.onload = this.loadImage(this.imageElement);
							this.imageElement.src	 = this.imageSrc;
							this.imageElement.x      = this.x;
							this.imageElement.y      = this.y;


							}
					}


				Sprite.prototype.paint = function(canvasContext){

					if (0 == this.Width)
					{
						this.Width  = this.isAnimated ? this.imageElement.width/this.frameCount : this.imageElement.width;
						this.Height = this.imageElement.height; 
						
					}

					if (this.isVisible){
						if (!this.isAnimated){
							canvasContext.drawImage(this.imageElement, this.x, this.y, (this.resolution * this.Width), (this.resolution * this.Height));
						}
						else {
								canvasContext.drawImage(this.imageElement, (this.startAnimIndex + this.currentFrame) * this.Width , 0, this.Width, this.Height, this.x, this.y, (this.resolution * this.Width), (this.resolution * this.Height));
								if (0 == (speedVariables.numberOfFrame) % speedVariables.speedController){	
									this.currentFrame = (++this.currentFrame) % this.frameThreshold;
							}
					}	
				}
			}

				Sprite.prototype.loadImage = function (image){

					if (image.complete){	
						return
					}else{
						window.setTimeOut(self.loadImage(image),100);
					}
				}

				Sprite.prototype.collidesWith = function(obj){

					if ( this.x + this.Width < obj.x){
						return false;
					}
					if ( this.x  > obj.x + obj.Width){
						return false;
					}
					if (this.y - this.Height > obj.y ){
						return false;
					}
					if ( this.y  < obj.y - obj.Height){
						return false;
					}
		
					return true;
				}
