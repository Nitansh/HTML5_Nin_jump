var menuVariables = {
	//Sprite(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated) generic code :D :D
	menu       :  new Sprite(0, 0, "/menu/splash.jpg", true, 1, 0, false),
	menuBg     :  new Sprite(0, (640 -316)/2, "/menu/menu_bg.png", true, 1, 0, false),
	backButton :  new Sprite(360 - 47, ((640 - 316)/2) - 47 + 316, "/menu/back_button.png", false, 1, 0, false),
	playButton :  new Sprite((360-104)/2, (640- 104)/2, "/menu/play.png", true, 1, 0, false),
	soundButton:  new Sprite(0, ((640-316)/2) - 66 +316, "/menu/sound.png", true, 2, 0, true),
	helpButton :  new Sprite(360 - 66 , (640 - 316)/2 - 66 + 316, "/menu/help.png", true, 1, 0, false),
	aboutButton:  new Sprite(0, (640 - 316)/2, "/menu/about.png", true, 1, 0, false)
};