window.SI.namespace('GameScreen', window.SI.Screen, ( function(windowObj, si, phaser) {
        'use strict';
        var // literals
            currentLangRuleIndex = null,
            currentWaveIndex = null,
            wavePoints = null,
            waveErrors = null,
            letterSpeed = 0,
            FORWARD_SLASH_KEY_CODE = null,
            targetX = null,
            targetY = null,
            correctMode = null,
            music1IsOn = null,

            // strings
            leftLetterText = null,
            rightLetterText = null,
            letterComboText = null,
            typingText = null,

            // arrays
            currentWaveArray = null,
            letterComboCharCodes = null,
            helperComboCharCodes = null,
            typingTextCharCodes = null,

            // core game objects
            thisObject = null,
            gameObject = null,
            sandhiInvadersData = null,
            iastAlphabet = null,

            // letter boxes
            rightLetterBox = null,
            leftLetterBox = null,

            // keys
            mySpaceKey = null,
            mySingleQuoteKey = null,
            myColonKey = null,
            myFwdDashKey = null,
            myMinusKey = null,
            myPlusKey = null,
            myBackspaceKey = null,

            // labels
            beginnerCheckBoxLabel = null,
            intermedCheckBoxLabel = null,
            advancedCheckBoxLabel = null,
            savedLabel = null,

            // text fields
            screenTypingTextField = null,
            scoreTextField = null,
            waveTextField = null,
            errorsTextField = null,
            correctLetterTextField = null,
            helperLetterTextField = null,
            titleTextField = null,
            madeByTextField = null,
            reportBugLabel = null,

            // buttons
            saveButton = null,
            resetWindow = null,
            submitButton = null,
            cancelButton = null,
            resetButton = null,
            resetGameButton = null,
            menuPauseButton = null,
            resumeButton = null,
            muteOnOffButton = null,
            playButton = null,
            helpButton = null,
            blogLinkButton = null,
            //testScreenButton = null,

            // check boxes
            beginnerSpeedCheckBox = null,
            intermediateSpeedCheckBox = null,
            advancedSpeedCheckBox = null,

            // sprites
            waterBgSprite = null,
            gameBgSprite = null,
            menuBgSprite = null,
            collisionBorder = null,
            riverAnim = null,

            // sounds
            errorSound = null,
            correctSound = null,
            waveCompleteSound = null,
            musicSound = null,

            // timers
            hideComboLetterTextFieldTimer = null;

        return {

            muteOnOffSound : function() {
                var siObject = this,
                    gameObject = siObject.gameObject;

                if (gameObject.sound.mute) {
                    muteOnOffButton.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'muteOn.png');
                    gameObject.sound.mute = false;
                    gameObject.sound.volume = si.Const.VOLUME;
                    musicSound.play('', 0, gameObject.sound.volume, true, true);
                    si.unmuteGame();
                } else {
                    muteOnOffButton.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'muteOff.png');
                    gameObject.sound.mute = true;
                    gameObject.sound.volume = 0;
                    si.muteGame();
                }

                thisObject.saveGame();
            },

            init : function(params) {
                thisObject = this;
                gameObject = si.gameObject;

                currentLangRuleIndex = 0;
                currentWaveIndex = 0;
                wavePoints = 0;
                waveErrors = 0;
                letterSpeed = si.Const.SPEED_BEGINNER;
                FORWARD_SLASH_KEY_CODE = phaser.Keyboard.HELP;
                targetX = 0;
                targetY = 0;
                correctMode = false;

                leftLetterText = "";
                rightLetterText = "";
                letterComboText = "";
                typingText = "";

                gameObject.sound.mute = si.isMuted();
                gameObject.sound.volume = (gameObject.sound.mute ? 0 : si.Const.VOLUME);
                music1IsOn = (si.Utility.randomNumber(1, 2) === 1);

                errorSound = si.gameObject.add.audio(si.SoundAssetKeys.ERROR_SOUND);
                correctSound = si.gameObject.add.audio(si.SoundAssetKeys.CORRECT_SOUND);
                waveCompleteSound = si.gameObject.add.audio(si.SoundAssetKeys.WAVE_COMPLETE_SOUND);
                musicSound = si.gameObject.add.audio(music1IsOn ? si.SoundAssetKeys.MUSIC1_SOUND : si.SoundAssetKeys.MUSIC2_SOUND);
                gameObject.sound.stopAll();

                currentWaveArray = [];
                letterComboCharCodes = [];
                helperComboCharCodes = [];
                typingTextCharCodes = [];

                thisObject.gameObjects = gameObject.add.group();
                thisObject.menuObjects = gameObject.add.group();

                sandhiInvadersData = si.getSandhiInvadersData();
                iastAlphabet = si.getIASTAlphabet();

                currentWaveIndex = si.getCurrentWaveIndex();
                wavePoints = si.getWavePointsArray()[currentWaveIndex];
                waveErrors = si.getWaveErrorsArray()[currentWaveIndex];
                si.resumeGame();

                si.Utility.fadeInGroup(thisObject.gameObjects);
                si.Utility.fadeInGroup(thisObject.menuObjects);
            },

            sendSingleQuoteKey : function(kbBtn) {
                thisObject.keypressHandler("'", 39);
            },

            sendOtherKey: function (kbBtn) {
                thisObject.keypressHandler(null, kbBtn.keyCode);
            },

            hideComboLetterTextField: function () {
                helperLetterTextField.visible = false;
            },

            pauseUnpauseGame: function () {
                if (si.isGamePaused()) {
                    si.resumeGame();

                    if (leftLetterBox !== null && rightLetterBox !== null) {
                        leftLetterBox.unpause();
                        rightLetterBox.unpause();
                    }

                    riverAnim.animations.play('flowing');
                    
                    menuPauseButton.visible = true;
                    menuBgSprite.visible = false;
                    saveButton.visible = false;
                    resetButton.visible = false;
                    helpButton.visible = false;
                    //testScreenButton.visible = false;
                    savedLabel.visible = false;
                    reportBugLabel.visible = false;
                    beginnerCheckBoxLabel.visible = false;
                    beginnerSpeedCheckBox.visible = false;
                    intermedCheckBoxLabel.visible = false;
                    intermediateSpeedCheckBox.visible = false;
                    advancedCheckBoxLabel.visible = false;
                    advancedSpeedCheckBox.visible = false;
                    resumeButton.visible = false;
                    muteOnOffButton.visible = false;
                    blogLinkButton.visible = false;

                    gameObject.input.keyboard.addCallbacks(thisObject, null, null, thisObject.keypressHandler);
                } else {
                    si.pauseGame();

                    if (leftLetterBox !== null && rightLetterBox !== null) {
                        leftLetterBox.pause();
                        rightLetterBox.pause();
                    }

                    if (!si.getFirstVisit()) {
                        resetButton.visible = true;
                    }

                    riverAnim.animations.stop('flowing');
                    
                    menuPauseButton.visible = false;
                    resumeButton.visible = true;
                    menuBgSprite.visible = true;
                    helpButton.visible = true;
                    //testScreenButton.visible = true;
                    saveButton.visible = true;
                    //reportBugLabel.visible = true;
                    beginnerCheckBoxLabel.visible = true;
                    beginnerSpeedCheckBox.visible = true;
                    intermedCheckBoxLabel.visible = true;
                    intermediateSpeedCheckBox.visible = true;
                    advancedCheckBoxLabel.visible = true;
                    advancedSpeedCheckBox.visible = true;
                    muteOnOffButton.visible = true;
                    //blogLinkButton.visible = true;

                    gameObject.input.keyboard.addCallbacks(thisObject, null, null, null);
                }
            },

            resetGame: function () {
                var tweenFunc = function() {
                    var siTweenObject = this;

                    siTweenObject.gameObject.state.start(siTweenObject.GameScreen.KEY);
                    siTweenObject.gameObject.state.clearCurrentState();
                };

                si.resetGame();
                si.Utility.fadeOutGroup(thisObject.gameObjects).onComplete.add(tweenFunc, si);
                si.Utility.fadeOutGroup(thisObject.menuObjects).onComplete.add(tweenFunc, si);
            },

            saveGame : function() {
                thisObject.updatePointsAndErrors();
                si.saveGame();
                savedLabel.visible = true;
            },

            showResetWindow: function () {
                resetWindow.visible = true;
                cancelButton.visible = true;
                resetGameButton.visible = true;
                resetButton.visible = false;
                saveButton.visible = false;
                blogLinkButton.visible = false;
                helpButton.visible = false;
                //testScreenButton.visible = false;
                resumeButton.visible = false;
                beginnerCheckBoxLabel.visible = false;
                beginnerSpeedCheckBox.visible = false;
                advancedCheckBoxLabel.visible = false;
                advancedSpeedCheckBox.visible = false;
                intermedCheckBoxLabel.visible = false;
                intermediateSpeedCheckBox.visible = false;
            },

            closeResetWindow: function () {
                resetWindow.visible = false;
                cancelButton.visible = false;
                resetGameButton.visible = false;
                resetButton.visible = true;
                saveButton.visible = true;
                //blogLinkButton.visible = true;
                helpButton.visible = true;
                //testScreenButton.visible = true;
                resumeButton.visible = true;
                beginnerCheckBoxLabel.visible = true;
                beginnerSpeedCheckBox.visible = true;
                advancedCheckBoxLabel.visible = true;
                advancedSpeedCheckBox.visible = true;
                intermedCheckBoxLabel.visible = true;
                intermediateSpeedCheckBox.visible = true;
            },

            clearscreenTypingTextField: function () {
                screenTypingTextField.text = "";
            },

            startGame: function () {
                musicSound.play('', 0, gameObject.sound.volume, true, true);
                gameObject.input.keyboard.addCallbacks(thisObject, null, null, thisObject.keypressHandler);
                thisObject.nextRule();
                riverAnim.animations.play('flowing');
                playButton.visible = false;
                titleTextField.visible = false;
                menuPauseButton.visible = true;
                waveTextField.visible = true;
                scoreTextField.visible = true;
                errorsTextField.visible = true;
                madeByTextField.visible = false;
            },

            create : function() {

                // start subsystems
                gameObject.physics.startSystem(phaser.Physics.ARCADE);

                // create timers
                hideComboLetterTextFieldTimer = new phaser.Timer(gameObject, false);
                hideComboLetterTextFieldTimer.add(si.Const.HIDE_COMBO_TEXT_TIMER_DELAY, thisObject.hideComboLetterTextField);
                gameObject.time.add(hideComboLetterTextFieldTimer);

                // setup keys
                mySpaceKey = gameObject.input.keyboard.addKey(phaser.Keyboard.SPACEBAR);
                mySpaceKey.onDown.add(thisObject.sendOtherKey, thisObject);

                mySingleQuoteKey = gameObject.input.keyboard.addKey(phaser.Keyboard.QUOTES);
                mySingleQuoteKey.onDown.add(thisObject.sendSingleQuoteKey, thisObject);

                myColonKey = gameObject.input.keyboard.addKey(phaser.Keyboard.COLON);
                myColonKey.onDown.add(thisObject.sendOtherKey, thisObject);

                myFwdDashKey = gameObject.input.keyboard.addKey(FORWARD_SLASH_KEY_CODE);
                myFwdDashKey.onDown.add(thisObject.sendOtherKey, thisObject);

                myMinusKey = gameObject.input.keyboard.addKey(phaser.Keyboard.MINUS);
                myMinusKey.onDown.add(thisObject.sendOtherKey, thisObject);

                myPlusKey = gameObject.input.keyboard.addKey(phaser.Keyboard.PLUS);
                myPlusKey.onDown.add(thisObject.sendOtherKey, thisObject);

                myBackspaceKey = gameObject.input.keyboard.addKey(phaser.Keyboard.BACKSPACE);
                myBackspaceKey.onDown.add(thisObject.sendOtherKey, thisObject);

                // create scene objects
                collisionBorder = gameObject.add.sprite(0, si.Const.Graphics.COLLISION_BORDER_Y, si.ImageAssetKeys.COLLISION_BORDER);
                gameObject.physics.enable(collisionBorder, phaser.Physics.ARCADE);
                collisionBorder.body.checkCollision.up = true;
                collisionBorder.body.checkCollision.down = false;
                collisionBorder.body.checkCollision.left = false;
                collisionBorder.body.checkCollision.right = false;
                collisionBorder.body.immovable = true;
                thisObject.gameObjects.add(collisionBorder);
                
                waterBgSprite = gameObject.add.sprite(0, 0, si.ImageAssetKeys.WATER_BG);
                thisObject.gameObjects.add(waterBgSprite);
                
                riverAnim = gameObject.add.sprite(0, 0, si.ImageAssetKeys.RIVER_ANIM_ATLAS, 0);
                riverAnim.scale.x = 2;
                riverAnim.scale.y = 2;
                riverAnim.animations.add('flowing', si.GraphicsUtility.riverAnimArray, 30, true);
                thisObject.gameObjects.add(riverAnim);
                
                gameBgSprite = gameObject.add.sprite(0, 0, si.ImageAssetKeys.HIMALAYAS_BG);
                thisObject.gameObjects.add(gameBgSprite);

                waveTextField = gameObject.add.text(10, 10, si.generateWaveText(currentWaveArray.length), si.Utility.getTextStyle20());
                waveTextField.visible = false;
                thisObject.gameObjects.add(waveTextField);

                scoreTextField = gameObject.add.text(10, 40, si.generateScoreText(), si.Utility.getTextStyle20());
                scoreTextField.visible = false;
                thisObject.gameObjects.add(scoreTextField);

                errorsTextField = gameObject.add.text(10, 70, si.generateErrorsText(), si.Utility.getTextStyle20());
                errorsTextField.visible = false;
                thisObject.gameObjects.add(errorsTextField);

                correctLetterTextField = gameObject.add.text(240, 50, "", si.Utility.getTextStyleScreenTypingTextWhite());
                correctLetterTextField.alpha = 0.5;
                correctLetterTextField.anchor.setTo(0.5, 0.5);
                correctLetterTextField.width = 480;
                correctLetterTextField.height = 240;
                correctLetterTextField.fill = "White";
                correctLetterTextField.visible = false;
                thisObject.gameObjects.add(correctLetterTextField);

                if (si.debugMode()) {
                    correctLetterTextField.visible = true;
                }

                helperLetterTextField = gameObject.add.text(240, 320, "", si.Utility.getTextStyleScreenTypingTextWhite());
                helperLetterTextField.alpha = 0.5;
                helperLetterTextField.anchor.setTo(0.5, 0.5);
                helperLetterTextField.width = 480;
                helperLetterTextField.height = 240;
                helperLetterTextField.fill = "White";
                helperLetterTextField.visible = false;
                thisObject.gameObjects.add(helperLetterTextField);

                screenTypingTextField = gameObject.add.text(200, 520, "", si.Utility.getTextStyleScreenTypingTextGreen());
                screenTypingTextField.alpha = 0.5;
                screenTypingTextField.anchor.setTo(0.5, 0.5);
                screenTypingTextField.width = 480;
                screenTypingTextField.height = 240;
                thisObject.menuObjects.add(screenTypingTextField);

                menuBgSprite = gameObject.add.sprite(0, 0, si.ImageAssetKeys.BGS_SHEET_ATLAS, "greyBg.png");
                menuBgSprite.alpha = 0.5;
                menuBgSprite.visible = false;
                thisObject.menuObjects.add(menuBgSprite);

                // beginner checkbox
                beginnerCheckBoxLabel = gameObject.add.text(200, 115, 'Beginner', si.Utility.getTextStyle20());
                beginnerCheckBoxLabel.visible = false;
                thisObject.menuObjects.add(beginnerCheckBoxLabel);

                beginnerSpeedCheckBox = gameObject.add.sprite(150, 110, si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, thisObject.enableDisableChkBox(si.Const.SPEED_BEGINNER));
                beginnerSpeedCheckBox.inputEnabled = true;
                beginnerSpeedCheckBox.visible = false;
                beginnerSpeedCheckBox.events.onInputDown.add(function () {
                    var siObject = this;

                    siObject.setGameSpeed(siObject.Const.SPEED_BEGINNER);
                    thisObject.saveGame();
                    beginnerSpeedCheckBox.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOn.png');
                    intermediateSpeedCheckBox.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOff.png');
                    advancedSpeedCheckBox.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOff.png');
                }, si);
                thisObject.menuObjects.add(beginnerSpeedCheckBox);

                // intermediate checkbox
                intermedCheckBoxLabel = gameObject.add.text(200, 175, 'Intermediate', si.Utility.getTextStyle20());
                intermedCheckBoxLabel.visible = false;
                thisObject.menuObjects.add(intermedCheckBoxLabel);

                intermediateSpeedCheckBox = gameObject.add.sprite(150, 170, si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, thisObject.enableDisableChkBox(si.Const.SPEED_INTERMEDIATE));
                intermediateSpeedCheckBox.inputEnabled = true;
                intermediateSpeedCheckBox.visible = false;
                intermediateSpeedCheckBox.events.onInputDown.add(function () {
                    var siObject = this;

                    siObject.setGameSpeed(siObject.Const.SPEED_INTERMEDIATE);
                    thisObject.saveGame();
                    beginnerSpeedCheckBox.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOff.png');
                    intermediateSpeedCheckBox.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOn.png');
                    advancedSpeedCheckBox.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOff.png');
                }, si);
                thisObject.menuObjects.add(intermediateSpeedCheckBox);

                // advanced checkbox
                advancedCheckBoxLabel = gameObject.add.text(200, 235, 'Advanced', si.Utility.getTextStyle20());
                advancedCheckBoxLabel.visible = false;
                thisObject.menuObjects.add(advancedCheckBoxLabel);

                advancedSpeedCheckBox = gameObject.add.sprite(150, 230, si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, thisObject.enableDisableChkBox(si.Const.SPEED_ADVANCED));
                advancedSpeedCheckBox.inputEnabled = true;
                advancedSpeedCheckBox.visible = false;
                advancedSpeedCheckBox.events.onInputDown.add(function () {
                    var siObject = this;

                    siObject.setGameSpeed(siObject.Const.SPEED_ADVANCED);
                    thisObject.saveGame();
                    beginnerSpeedCheckBox.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOff.png');
                    intermediateSpeedCheckBox.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOff.png');
                    advancedSpeedCheckBox.loadTexture(si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'checkBoxOn.png');
                }, si);
                thisObject.menuObjects.add(advancedSpeedCheckBox);

                titleTextField = gameObject.add.text(50, 50, si.Const.GAME_NAME, si.Utility.getTextStyleGameTitle());
                thisObject.menuObjects.add(titleTextField);

                madeByTextField = gameObject.add.text(130, 420, si.Const.GameMessages.MADE_BY_MSG, si.Utility.getTextStyleMadeBy());
                madeByTextField.wordWrap = true;
                madeByTextField.wordWrapWidth = 240;
                thisObject.menuObjects.add(madeByTextField);

                reportBugLabel = gameObject.add.text(50, 690, si.Const.GameMessages.REPORT_A_BUG_MSG, si.Utility.getTextStyle12());
                reportBugLabel.visible = false;
                thisObject.menuObjects.add(reportBugLabel);

                // buttons
                playButton = si.SIButton.SIButton(170, 300, si.ImageAssetKeys.STANDARD_BUTTONS_SHEET, windowObj, thisObject.startGame,
                                                    null, null, null, null, null, null, 5, 4, 4, 5);
                thisObject.menuObjects.add(playButton);

                menuPauseButton = si.SIButton.SIButton(410, 10, si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, gameObject.time.events,
                                                        thisObject.pauseUnpauseGame, null, null, null, null, null, null,
                                                            'menuPauseButtonOver.png', 'menuPauseButton.png', 'menuPauseButton.png', 'menuPauseButtonOver.png');
                menuPauseButton.visible = false;
                thisObject.menuObjects.add(menuPauseButton);

                muteOnOffButton = gameObject.add.sprite(410, 10, si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, (si.isMuted() ? 'muteOff.png' : 'muteOn.png'));
                muteOnOffButton.inputEnabled = true;
                muteOnOffButton.visible = false;
                muteOnOffButton.events.onInputDown.add(thisObject.muteOnOffSound, si);
                thisObject.menuObjects.add(muteOnOffButton);

                helpButton = si.GoToScreen.Button(si.HelpScreen.KEY, [thisObject.gameObjects, thisObject.menuObjects], 175, 300,
                                                    si.ImageAssetKeys.STANDARD_BUTTONS_SHEET, thisObject, null, null, null, null, 7, 6, 6, 7);
                helpButton.visible = false;
                thisObject.menuObjects.add(helpButton);

                saveButton = si.SIButton.SIButton(175, 350, si.ImageAssetKeys.STANDARD_BUTTONS_SHEET, windowObj, thisObject.saveGame,
                                                    null, null, null, null, null, null, 13, 12, 12, 13);
                saveButton.visible = false;
                thisObject.menuObjects.add(saveButton);

                resetButton = si.SIButton.SIButton(175, 400, si.ImageAssetKeys.STANDARD_BUTTONS_SHEET, windowObj, thisObject.showResetWindow,
                                                    null, null, null, null, null, null, 11, 10, 10, 11);
                resetButton.visible = false;
                thisObject.menuObjects.add(resetButton);

                //testScreenButton = si.GoToScreen.Button(si.TestScreen.KEY, [thisObject.gameObjects, thisObject.menuObjects], 175, 450,
                                                    //si.ImageAssetKeys.STANDARD_BUTTONS_SHEET, thisObject, null, null, null, null, 17, 16, 16, 17);
                //testScreenButton.visible = false;
                //thisObject.menuObjects.add(testScreenButton);

                savedLabel = gameObject.add.text(210, 455, 'Saved!', si.Utility.getTextStyle17());
                savedLabel.visible = false;
                thisObject.menuObjects.add(savedLabel);

                resetWindow = gameObject.add.sprite(75, 300, si.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, 'resetWindow.png');
                resetWindow.visible = false;
                thisObject.menuObjects.add(resetWindow);

                resetGameButton = si.SIButton.SIButton(85, 385, si.ImageAssetKeys.STANDARD_BUTTONS_SHEET, windowObj, thisObject.resetGame,
                                                    null, null, null, null, null, null, 11, 10, 10, 11);
                resetGameButton.visible = false;
                thisObject.menuObjects.add(resetGameButton);

                   cancelButton = si.SIButton.SIButton(255, 385, si.ImageAssetKeys.STANDARD_BUTTONS_SHEET, windowObj, thisObject.closeResetWindow,
                                                    null, null, null, null, null, null, 29, 28, 28, 29);
                cancelButton.visible = false;
                thisObject.menuObjects.add(cancelButton);

                resumeButton = si.SIButton.SIButton(175, 500, si.ImageAssetKeys.STANDARD_BUTTONS_SHEET, windowObj, thisObject.pauseUnpauseGame,
                                                    null, null, null, null, null, null, 19, 18, 18, 19);
                resumeButton.visible = false;
                thisObject.menuObjects.add(resumeButton);

                blogLinkButton = gameObject.add.button(175, 550, si.ImageAssetKeys.STANDARD_BUTTONS_SHEET,
                                                    function () {
                                                        var windowObject = this;
                                                        windowObject.open(si.Const.BLOG_LINK, si.Const.BLOG_NAME, []);
                                                    },
                                                    windowObj, 1, 0, 0, 1);
                blogLinkButton.visible = false;
                thisObject.menuObjects.add(blogLinkButton);

                // final tasks
                gameObject.world.bringToTop(thisObject.menuObjects);
            },

            updatePointsAndErrors: function () {
                si.setWavePoints(currentWaveIndex, wavePoints);
                si.setWaveErrors(currentWaveIndex, waveErrors);
                scoreTextField.text = si.generateScoreText();
                errorsTextField.text = si.generateErrorsText();
            },

            update: function () {

                var currentRule = null;

                if (leftLetterBox !== null) {

                    if (gameObject.physics.arcade.overlap(collisionBorder, leftLetterBox.graphics) ||
                        gameObject.physics.arcade.overlap(collisionBorder, rightLetterBox.graphics)) {

                        collisionBorder.y = -200;
                        leftLetterBox.boxText.text = "";
                        rightLetterBox.boxText.text = "";

                        gameObject.input.keyboard.addCallbacks(thisObject, null, null, null);

                        currentRule = currentWaveArray[currentLangRuleIndex];

                        si.incrGameErrors();
                        currentRule.userAnswerIsCorrect = false;
                        helperLetterTextField.text = currentRule.COMBINED_LETTER;
                        helperLetterTextField.visible = true;

                        if (hideComboLetterTextFieldTimer.expired) {
                            hideComboLetterTextFieldTimer.add(si.Const.HIDE_COMBO_TEXT_TIMER_DELAY, thisObject.hideComboLetterTextField);
                        }

                        hideComboLetterTextFieldTimer.start();
                        typingTextCharCodes = [];

                        leftLetterBox.graphics.animations.play('splash');
                        rightLetterBox.graphics.animations.play('splash');

                        wavePoints -= 1;
                        waveErrors += 1;
                        thisObject.updatePointsAndErrors();

                    }

                    if (leftLetterBox.graphics.y <= si.Const.FLY_OFF_BORDER ||
                        leftLetterBox.graphics.y >= si.Const.SINK_BORDER) {
                        collisionBorder.y = si.Const.Graphics.COLLISION_BORDER_Y;
                        leftLetterBox.destroy();
                        rightLetterBox.destroy();
                        menuPauseButton.visible = true;
                        si.resumeGame();
                        thisObject.nextRule();
                    }

                    leftLetterBox.updatePosition();
                    rightLetterBox.updatePosition();
                }
            },

            enableDisableChkBox: function (speed) {
                return (speed === si.getGameSpeed() ? 'checkBoxOn.png' : 'checkBoxOff.png');
            },

            blowFlowers: function (letterBoxSprite, x, y) {
                var blastSound = si.gameObject.add.audio(si.SoundAssetKeys.BLAST_SOUND),
                    emitter = si.gameObject.add.emitter(x, y, 100);

                emitter.makeParticles(si.ImageAssetKeys.FLOWER);
                emitter.gravity = 200;
                si.setGameSpeed(si.Const.SPEED_FLY_OFF);

                if (letterBoxSprite !== null) {

                    si.pauseGame();
                    menuPauseButton.visible = false;
                    letterBoxSprite.flyOff();

                    emitter.start(true, 2000, null, 10);

                    blastSound.play();
                }
            },

            goToGameOverScreen: function () {

                var tweenFunc = function() {

                    var siTweenObject = this;

                    siTweenObject.gameObject.state.start(siTweenObject.GameOverScreen.KEY);
                    siTweenObject.gameObject.state.clearCurrentState();

                };

                si.Utility.fadeOutGroup(thisObject.gameObjects).onComplete.add(tweenFunc, si);
                si.Utility.fadeOutGroup(thisObject.menuObjects);

            },

            nextRule : function() {

                var i = null,
                    j = null,
                    charCode = null,
                    newCharCode = null,
                    currentRule = null,
                    analogCodes = null,
                    dataObj = null,
                    waveLength = si.Utility.getCurrentWaveLength(currentWaveIndex);

                si.setGameSpeed(si.Utility.parseInt(window.localStorage.getItem(si.Const.GAME_SPEED_WS_KEY)));

                if (gameObject.input.keyboard.onPressCallback === null) {
                    gameObject.input.keyboard.addCallbacks(thisObject, null, null, thisObject.keypressHandler);
                }

                letterComboCharCodes = [];
                helperComboCharCodes = [];
                typingTextCharCodes = [];
                currentWaveArray = [];

                screenTypingTextField.text = "";

                for (i = 0; i < waveLength; i += 1) {

                    currentRule = sandhiInvadersData[currentWaveIndex][i];

                    if (!currentRule.played || !currentRule.userAnswerIsCorrect) {
                        currentWaveArray.push(currentRule);
                    }

                }

                if (currentWaveArray.length === 0) {

                    if (currentWaveIndex === si.Const.WAVES_COUNT - 1) {
                        thisObject.saveGame();
                        thisObject.goToGameOverScreen();
                        return;
                    }

                    waveCompleteSound.play();

                    currentWaveIndex = si.incrCurrentWaveIndex();
                    wavePoints = si.getWavePointsArray()[currentWaveIndex];
                    waveErrors = si.getWaveErrorsArray()[currentWaveIndex];
                    thisObject.saveGame();
                    savedLabel.visible = false;
                    thisObject.nextRule();

                } else {

                    waveTextField.text = si.generateWaveText(currentWaveArray.length);

                    currentLangRuleIndex = si.Utility.randomNumber(0, currentWaveArray.length - 1);
                    currentWaveArray[currentLangRuleIndex].played = true;

                    // create left letter box
                    leftLetterText = currentWaveArray[currentLangRuleIndex].LEFT_LETTER;

                    if (leftLetterBox === null || leftLetterBox.graphics === null || leftLetterBox.boxText === null || rightLetterBox.graphics.body === null) {

                        leftLetterBox = si.LetterBox.LetterBox(si.Utility.randomNumber(40, si.Const.LEFT_LETTER_BOUNDARY), si.Const.DEFAULT_LETTER_Y,
                                                                si.getGameSpeed(), leftLetterText);
                        thisObject.gameObjects.add(leftLetterBox.graphics);
                        thisObject.gameObjects.add(leftLetterBox.boxText);

                    } else {

                        leftLetterBox.boxText.text = leftLetterText;
                        leftLetterBox.move(si.Utility.randomNumber(40, si.Const.LEFT_LETTER_BOUNDARY), si.Const.DEFAULT_LETTER_Y);
                        leftLetterBox.show();
                        leftLetterBox.unpause();

                    }

                    leftLetterBox.graphics.animations.play('floating');

                    // create right letter box
                    rightLetterText = currentWaveArray[currentLangRuleIndex].RIGHT_LETTER;

                    if (rightLetterBox === null || rightLetterBox.graphics === null || rightLetterBox.boxText === null || rightLetterBox.graphics.body === null) {

                        rightLetterBox = si.LetterBox.LetterBox(si.Utility.randomNumber(si.Const.RIGHT_LETTER_BOUNDARY, si.Const.STAGE_WIDTH - 40),
                                                                si.Const.DEFAULT_LETTER_Y, si.getGameSpeed(), rightLetterText);
                        thisObject.gameObjects.add(rightLetterBox.graphics);
                        thisObject.gameObjects.add(rightLetterBox.boxText);

                    } else {

                        rightLetterBox.boxText.text = rightLetterText;
                        rightLetterBox.move(si.Utility.randomNumber(si.Const.RIGHT_LETTER_BOUNDARY, si.Const.STAGE_WIDTH - 40), si.Const.DEFAULT_LETTER_Y);
                        rightLetterBox.show();
                        rightLetterBox.unpause();

                    }

                    rightLetterBox.graphics.animations.play('floating');

                    letterComboText = currentWaveArray[currentLangRuleIndex].COMBINED_LETTER;
                    correctLetterTextField.text = letterComboText;

                    for (i = 0; i < letterComboText.length; i += 1) {
                        charCode = letterComboText.charCodeAt(i);
                        helperComboCharCodes[i] = charCode;
                    }

                    for (i = 0; i < helperComboCharCodes.length; i += 1) {

                        newCharCode = si.Utility.getIASTChar(helperComboCharCodes[i]);

                        if (newCharCode !== null) {

                            analogCodes = newCharCode.analogCodes;

                            for (j = 0; j < analogCodes.length; j += 1) {

                                letterComboCharCodes.push(analogCodes[j]);

                            }

                        } else {

                            letterComboCharCodes.push(helperComboCharCodes[i]);

                        }

                    }
                }
            },

            keypressHandler : function(key, keyCode) {
                var comboTxtLen = letterComboText.length,
                    typingTxtLen = typingText.length,
                    comboTextCodes = "",
                    typingTextCodes = "",
                    currentRule = null;

                if (key === undefined || key === null) {

                    key = String.fromCharCode(keyCode);
                    typingTextCharCodes.push(keyCode);

                } else {

                    typingTextCharCodes.push(key.toLowerCase().charCodeAt(0));

                }

                typingText += key;

                comboTextCodes = letterComboCharCodes.join(",");
                typingTextCodes = typingTextCharCodes.join(",");

                if (comboTextCodes === typingTextCodes) {

                    currentRule = currentWaveArray[currentLangRuleIndex];

                    thisObject.blowFlowers(leftLetterBox, leftLetterBox.graphics.x, leftLetterBox.graphics.y + si.Const.Graphics.PARTICLE_SHIFT_Y);
                    thisObject.blowFlowers(rightLetterBox, rightLetterBox.graphics.x, rightLetterBox.graphics.y + si.Const.Graphics.PARTICLE_SHIFT_Y);

                    wavePoints += si.Utility.parseInt(currentRule.DIFFICULTY);
                    currentRule.userAnswerIsCorrect = true;

                    if (!correctMode) {
                        screenTypingTextField.text = "";
                        correctMode = true;
                    }

                    screenTypingTextField.fill = "Green";
                    screenTypingTextField.text += key;

                    gameObject.input.keyboard.addCallbacks(thisObject, null, null, null);

                    correctSound.play();

                } else if (comboTextCodes.indexOf(typingTextCodes) === 0) {

                    if (!correctMode) {
                        screenTypingTextField.text = "";
                        correctMode = true;
                    }

                    screenTypingTextField.text += key;
                    screenTypingTextField.fill = "Green";

                    correctSound.play();

                } else {

                    correctMode = false;
                    wavePoints -= 1;
                    waveErrors += 1;
                    screenTypingTextField.text += key;
                    screenTypingTextField.fill = "Red";
                    typingTextCharCodes = [];

                    errorSound.play();

                }

                thisObject.updatePointsAndErrors();
            }
        };
    }(window, window.SI, Phaser)));

