var menuVariables = {
	//Sprite(positionX, positionY, imageUrl, isVisible, frameCount, rowCount, isAnimated) generic code :D :D
	menu       :  new Sprite(0, 0, "/menu/splash.jpg", true, 1, 0, false),
	menuBg     :  new Sprite(0, (commonConfiguration.ClientHeight -commonConfiguration.MenuHardCode)/2, "/menu/menu_bg.png", true, 1, 0, false),
	backButton :  new Sprite(commonConfiguration.ClientWidth - 47, ((commonConfiguration.ClientHeight - commonConfiguration.MenuHardCode)/2) - 47 + commonConfiguration.MenuHardCode, "/menu/back_button.png", false, 1, 0, false),
	playButton :  new Sprite((commonConfiguration.ClientWidth-104)/2, (commonConfiguration.ClientHeight- 104)/2, "/menu/play.png", true, 1, 0, false),
	soundButton:  new Sprite(0, ((commonConfiguration.ClientHeight-commonConfiguration.MenuHardCode)/2) - 66 +commonConfiguration.MenuHardCode, "/menu/sound.png", true, 2, 0, true),
	helpButton :  new Sprite(commonConfiguration.ClientWidth - 66 , (commonConfiguration.ClientHeight - commonConfiguration.MenuHardCode)/2 - 66 + commonConfiguration.MenuHardCode, "/menu/help.png", true, 1, 0, false),
	aboutButton:  new Sprite(0, (commonConfiguration.ClientHeight - commonConfiguration.MenuHardCode)/2, "/menu/about.png", true, 1, 0, false),
	aboutText  :  new Sprite(0, (commonConfiguration.ClientHeight - commonConfiguration.MenuHardCode)/2, "/menu/about_text.png", false, 1, 0, false),
	resumeButton: new Sprite((commonConfiguration.ClientWidth - 181)/2, (commonConfiguration.ClientHeight)/2 - 80 , "/game/resume.png",false, 1, 0, false),
	main_menu :   new Sprite((commonConfiguration.ClientWidth - 181)/2, (commonConfiguration.ClientHeight)/2 + 40, "/game/main_menu.png",false, 1, 0, false)
};
