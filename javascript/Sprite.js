/***************************************************************
	Filename    :   Sprite.js

	Description :   Describe the whole object of sprite and the sprite 
					class is the most basic class which will be inherited
					by the all the objects used in the game.

*****************************************************************/

function Sprite(positionX, positionY, imageUrl, isVisible, frameCount, rowcount, isAnimated){
				
					this.x                 = positionX;
					this.y                 = positionY; 
					this.imageSrc          = "../res" + imageUrl;
					this.isHit             = false;
					this.isVisible         = isVisible;
					this.Height            = 0;
					this.Width             = 0;
					this.resolution        = 1;
					this.frameCount		   = frameCount;
					this.rowcount		   = rowcount;
					this.currentRowCount   = 0;
					this.imageElement      = null;
					this.imageLoad         = false;
					this.heroLastANimation = false;
					this.heroDied          = false; 
					
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
							var self = this;
							this.imageElement        = new Image();
							this.imageElement.onload = function(){ self.setHeigthWidth();self.imageLoad = true; self.paint(window.Globalcontext);}
							this.imageElement.src	 = this.imageSrc;
							this.imageElement.x      = this.x;
							this.imageElement.y      = this.y;


							}
					}

				Sprite.prototype.setHeigthWidth = function(imageUrl){
					this.Width  = this.isAnimated ? this.imageElement.width/this.frameCount : this.imageElement.width;
					this.Height = (0 != this.rowcount) ? this.imageElement.height/this.rowcount : this.imageElement.height; 
				}

				Sprite.prototype.paint = function(canvasContext){

					if (this.isVisible && this.imageLoad && canvasContext){
						if (!this.isAnimated){
							canvasContext.drawImage(this.imageElement, this.x, this.y, (this.resolution * this.Width), (this.resolution * this.Height));
						}
						else {
								canvasContext.drawImage(this.imageElement, (this.startAnimIndex + this.currentFrame) * this.Width , (this.currentRowCount * this.Height), this.Width, this.Height, this.x, this.y, (this.resolution * this.Width), (this.resolution * this.Height));
								if (0 == (speedVariables.numberOfFrame) % speedVariables.speedController){	
									this.currentFrame = (++this.currentFrame) % this.frameThreshold;
							    }
							    if (this.rowcount && !this.currentFrame){
							    	if (0 == (speedVariables.numberOfFrame) % speedVariables.speedController){	
										this.currentRowCount = (++this.currentRowCount) % this.rowcount;
										this.currentFrame == 0;
									}
								}
							}
						}
				}


				Sprite.prototype.update = function(){
					
				}

				Sprite.prototype.Clicked = function(event){
					var MouseX = event.pageX;
					var MouseY = event.pageY ;

					if (this.x < MouseX && (this.x + this.Width) > MouseX && this.y < MouseY && (this.y + this.Height) > MouseY )
						return true;
					else 
						return false;

				}