window.SI.namespace('Preloader', window.SI.Screen, (function (si) {'use strict';
    var gameObject = null,
        thisObject = null;

    return {

        init: function () {
            thisObject = this;
            gameObject = si.gameObject;

            //si.enableDebugMode();

            si.siPreloader = si.createSiPreloader();

            thisObject.initScreen();
            thisObject.createLogTextField();
        },

        preload: function () {

            si.loadAudio('CORRECT_SOUND', null, ['assets/audio/correct.ogg', 'assets/audio/correct.mp3']);
            si.loadAudio('ERROR_SOUND', null, ['assets/audio/error.ogg', 'assets/audio/error.mp3']);
            si.loadAudio('BLAST_SOUND', null, ['assets/audio/blast.ogg', 'assets/audio/blast.mp3']);
            si.loadAudio('EXPLODE_SOUND', null, ['assets/audio/explode.ogg', 'assets/audio/explode.mp3']);
            si.loadAudio('CLICK_SOUND', null, ['assets/audio/buttonClick.ogg', 'assets/audio/buttonClick.mp3']);
            si.loadAudio('WAVE_COMPLETE_SOUND', null, ['assets/audio/waveComplete.ogg', 'assets/audio/waveComplete.mp3']);
            si.loadAudio('GAME_COMPLETE_SOUND', null, ['assets/audio/gameComplete.ogg', 'assets/audio/gameComplete.mp3']);
            si.loadAudio('MUSIC1_SOUND', null, ['assets/audio/music1.ogg', 'assets/audio/music1.mp3']);
            si.loadAudio('MUSIC2_SOUND', null, ['assets/audio/music2.ogg', 'assets/audio/music2.mp3']);

            si.loadSpriteSheet('GUIDE_BUTTONS_SHEET', null, 'assets/images/UI/guideButtonsSheet.png', 100, 40, 8);
            si.loadSpriteSheet('SOCIAL_BUTTONS_SHEET', null, 'assets/images/UI/socialButtonsSheet.png', 152, 61.5, 4);
            si.loadSpriteSheet('STANDARD_BUTTONS_SHEET', null, 'assets/images/UI/standardButtonsSheet.png', 152, 38.66, 30);
            si.loadSpriteSheet('EXPLOSION', null, 'assets/images/explode.png', 128, 128, 16);
            //si.loadSpriteSheet('RIPPLE', null, 'assets/images/ripple.png', 125, 563, 69);
            si.loadAtlasJSONArray('RIPPLE', null, 'assets/images/ripple.png', 'assets/settings/ripple.json');

            si.loadImage('HIMALAYAS_BG', null, 'assets/images/himalayas.png');
            si.loadImage('BALLOON', null, 'assets/images/balloon.png');
            si.loadImage('BALLOON_WIDE', null, 'assets/images/balloon-wide.png');
            si.loadImage('FLOWER', null, 'assets/images/flower.png');
            si.loadImage('COLLISION_BORDER', null, 'assets/images/collisionBorder.png');

            si.loadAtlasJSONHash('SMALL_SPRITES_ATLAS', null, 'assets/images/smallSprites.png', 'assets/settings/smallSprites.json');
            si.loadAtlasJSONHash('BGS_SHEET_ATLAS', null, 'assets/images/bgsSheet.png', 'assets/settings/bgsSheet.json');
            si.loadAtlasJSONHash('OTHER_GUI_ASSETS_ATLAS', null, 'assets/images/UI/otherGuiAssetsSheet.png', 'assets/settings/otherGuiAssetsHash.json');

            si.loadJSON('SANDHI_INVADERS_DATA_JSON', null, 'assets/settings/SandhiInvadersDataDiff.json');
            si.loadJSON('IAST_ALPHABET_JSON', null, 'assets/settings/IASTAlphabet.json');
            si.loadJSON('GUIDE_MESSAGES_JSON', null, 'assets/settings/guideMessages.json');

            thisObject.load.onFileError.add(function (error) {
                var siObject = this;

                thisObject.logTextField.text += 'Error loading file: ' + error;
            }, si);

            thisObject.load.onFileStart.add(function (param) {
                var siObject = this;

                thisObject.logTextField.text += 'Loading files, percent: ' + param + '%';
            }, si);

            thisObject.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
                var siObject = this;

                siObject.siPreloader.preloaderTop.clear();
                siObject.siPreloader.preloaderTop.beginFill(si.Const.Graphics.DARK_GRAY_COLOR, 1);
                siObject.siPreloader.preloaderTop.drawRect(2, 2, progress, 11);
                siObject.siPreloader.ready = true;

                thisObject.logTextField.text += 'Finished loading file: ' + JSON.stringify(arguments);
            }, si);

            thisObject.load.onLoadStart.add(function (param) {
                var siObject = this;

                thisObject.logTextField.text += 'Started loading files: ' + param;
            }, si);

            thisObject.load.onLoadComplete.add(function () {
                var siObject = this;

                siObject.loadGameCacheData();

                thisObject.logTextField.text += siObject.GameMessages.FINISHED_LOADING_FILES_MSG;
            }, si);

            thisObject.load.onPackComplete.add(function () {
                var siObject = this;

                thisObject.logTextField.text = siObject.GameMessages.FINISHED_PACKING_FILES_MSG;
            }, si);
        },

        update: function () {
            if (si.siPreloader.ready === true) {
                si.siPreloader.loadingTween = gameObject.add.tween(si.siPreloader.loadingObjects).to({alpha: 0},
                                                                        si.Const.FADE_DURATION, si.Const.TWEEN_LINEAR,
                                                                        true);
                si.siPreloader.loadingTween.onComplete.add(function () {
                    var siObject = this;

                    if (si.getFirstVisit()) {
                        siObject.gameObject.state.start(siObject.HelpScreen.KEY);
                    } else if (siObject.getCurrentWaveIndex() === si.Const.WAVES_COUNT - 1) {
                        siObject.gameObject.state.start(siObject.GameOverScreen.KEY);
                    } else {
                        siObject.gameObject.state.start(siObject.GameScreen.KEY);
                    }
                    siObject.gameObject.state.clearCurrentState();
                }, si);
                si.siPreloader.ready = false;
            }
        },

        shutdown: function () {
            gameObject = null;
            thisObject.clearScreenState();
        }
    };
    }(window.SI)));

