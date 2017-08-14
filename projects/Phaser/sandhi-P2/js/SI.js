/**
 * Sandhi Invaders - a typing game made with Phaser 2.2.2
 * @module SI
 * @class SI
 * @main SI
 * @author Vladimir Zakar aka bluePlayer/spinnerbox. https://github.com/bluePlayer/practices
 */
window.SI = window.SI || ( function(siWindowObject, phaser) {
        'use strict';
        var
        /**
         * windowObject is a reference name for the global object window
         * @property windowObject
         * @private
         * @type Object
         * @default window
         */ windowObject = siWindowObject,

        /**
         * Object that contains application configuration.
         * @property config
         * @private
         * @type Object
         * @default null
         */
            config = null,

        /**
         * thisObject is a reference name for the SI object, so that you don't have to write all the time 'this'.
         * @property thisObject
         * @private
         * @type Object
         * @default null
         */
            thisObject = null,

            game = null,

        /**
         * score is private variable that keeps track of overall game score, made my the player.
         * @property score
         * @private
         * @type Integer
         * @default 0
         */
            score = 0,

            gameSpeed = 0,

            gamePaused = false,

            maxGameScore = 0,

            gameErrors = 0,

            difficultiesCount = {
            "diff1" : 0,
            "diff2" : 0,
            "diff3" : 0,
            "diff4" : 0,
            "diff6" : 0,
            "diff8" : 0,
            "diff10" : 0
        },

            difficultiesPerWave = [],

        /**
         * currentWaveIndex is private variable holding the value of currently playing level. It goes from 0 up to WAVES_COUNT - 1.
         * @property currentWaveIndex
         * @private
         * @type Integer
         * @default 0
         */
            currentWaveIndex = 0,

        /**
         * wavePointsArray is private variable holding scores for each specific level, scored while playing the game.
         * @property wavePointsArray
         * @private
         * @type Array
         * @default []
         */
            wavePointsArray = [],

            waveErrorsArray = [],

            muted = false,

            firstVisit = true,

        /**
         * debugMode is private variable that enables logging when true and disables it when false.
         * @property debugMode
         * @private
         * @type Boolean
         * @default true
         */
            debugMode = false,

        /**
         * HTML_CONTAINER is private constant that holds the name of the div container where should the game be loaded.
         * @property HTML_CONTAINER
         * @private
         * @type String
         * @default 'gameContainer'
         */
            HTML_CONTAINER = 'gameContainer',

        /**
         * LOADING_LABEL_IMG_KEY string key for referencing the "loading label" image when starting the game.
         * @property LOADING_LABEL_IMG_KEY
         * @private
         * @type string
         * @default 'loadingLabel.png'
         */
            LOADING_LABEL_IMG_KEY = 'loadingLabel.png',

            IASTAlphabet = null,

            sandhiInvadersData = null;

        return {

            /**
             * Contains exceptions for handling software errors.
             * @namespace SI
             * @class Exceptions
             */
            Exceptions : {},

            /**
             * Contains constants created with Object.defineProperty() method in the initialization process of the game.
             * All members of this class are enumerable, non-writable and non-configurable
             * @namespace SI
             * @class Const
             */
            Const : {
                Graphics : {},
                GameMessages : {},
                GameErrors : {}
            },

            /**
             * Contains game-wide event listeners.
             * @namespace SI
             * @class Events
             */
            Events : {},

            /**
             * @class SI
             */
            siPreloader : null,

            /**
             * createSiPreloader() sets up all internal properties in preloader object and returns its value.
             * @method createSiPreloader
             * @default {
             *      loadingObjects: null,
             *      loadingLabel: null,
             *      preloaderBottom: null,
             *      preloaderTop: null,
             *      loadingObjects: null,
             *      ready:false,
             *      loadingTween: null
             *  }
             * @return {Object}
             */
            createSiPreloader : function() {
                var preloader = {
                    ready : false,
                    loadingTween : null,
                    loadingLabel : null,
                    loadingObjects : null,
                    preloaderBottom : null,
                    preloaderTop : null
                },
                    graphicsConst = thisObject.Const.Graphics;

                preloader.loadingObjects = game.add.group();

                preloader.loadingLabel = game.add.sprite(graphicsConst.LOADING_LABEL_X_POS, graphicsConst.LOADING_LABEL_Y_POS, thisObject.ImageAssetKeys.OTHER_GUI_ASSETS_ATLAS, LOADING_LABEL_IMG_KEY);
                preloader.loadingObjects.add(preloader.loadingLabel);

                preloader.preloaderBottom = game.add.graphics(graphicsConst.LOADING_BAR_X_POS, graphicsConst.LOADING_BAR_Y_POS);
                preloader.preloaderBottom.beginFill(graphicsConst.MATTERHORN_COLOR, graphicsConst.ALPHA_100_PERCENT);
                preloader.preloaderBottom.drawRect(graphicsConst.PRELOADER_BOTTOM_START_XY, graphicsConst.PRELOADER_BOTTOM_START_XY, graphicsConst.PRELOADER_BOTTOM_WIDTH, graphicsConst.PRELOADER_BOTTOM_HEIGHT);
                preloader.loadingObjects.add(preloader.preloaderBottom);

                preloader.preloaderTop = game.add.graphics(graphicsConst.LOADING_BAR_X_POS, graphicsConst.LOADING_BAR_Y_POS);
                preloader.preloaderTop.beginFill(graphicsConst.DARK_GRAY_COLOR, graphicsConst.ALPHA_100_PERCENT);
                preloader.preloaderTop.drawRect(graphicsConst.PRELOADER_TOP_START_XY, graphicsConst.PRELOADER_TOP_START_XY, graphicsConst.PRELOADER_TOP_WIDTH, graphicsConst.PRELOADER_TOP_HEIGHT);
                preloader.loadingObjects.add(preloader.preloaderTop);

                return preloader;
            },

            /**
             * SoundAssetKeys contains constants, string keys for referencing sound objects in the game.
             * @property SoundAssetKeys
             * @private
             * @type Object
             * @default {}
             */
            SoundAssetKeys : {},

            /**
             * ImageAssetKeys contains constants, string keys for referencing image/spritesheet objects in the game.
             * @property ImageAssetKeys
             * @private
             * @type Object
             * @default {}
             */
            ImageAssetKeys : {},

            /**
             * Settings contains constants, string keys for referencing json/csv files in the game.
             * @property Settings
             * @private
             * @type Object
             * @default {}
             */
            Settings : {},

            isGamePaused : function() {
                return gamePaused;
            },

            pauseGame : function() {
                gamePaused = true;
            },

            resumeGame : function() {
                gamePaused = false;
            },

            getFirstVisit : function() {
                return firstVisit;
            },

            setDirty : function() {
                firstVisit = false;
            },

            setNotDirty : function() {
                firstVisit = true;
            },

            /**
             * gameObject is a game-wide reference to the Phaser.Game instance created when initializing the game.
             * @property gameObject
             * @private
             * @type Phaser.Game
             * @default game
             */
            gameObject : null,

            /**
             * Returns current value of debugMode, true or false.
             * @method debugMode
             * @return {Boolean}
             */
            debugMode : function() {
                return debugMode;
            },

            enableDebugMode : function() {
                debugMode = true;
            },

            disableDebugMode : function() {
                debugMode = false;
            },

            isMuted: function () {
                return muted;
            },

            muteGame: function () {
                muted = true;
            },

            unmuteGame: function () {
                muted = false;
            },

            /**
             * Returns current value of score.
             * @method getScore
             * @return {Integer}
             */
            getScore : function() {
                return score;
            },

            getMaxGameScore : function() {
                return maxGameScore;
            },

            clearDifficutliesCount : function() {
                difficultiesCount = {
                    "diff1" : 0,
                    "diff2" : 0,
                    "diff3" : 0,
                    "diff4" : 0,
                    "diff6" : 0,
                    "diff8" : 0,
                    "diff10" : 0
                };
                maxGameScore = 0;
            },

            updateMaxGameScore : function() {
                var helper = 0,
                    diff = null,
                    helper1 = 0;

                for (diff in difficultiesCount) {
                    if (difficultiesCount.hasOwnProperty(diff)) {
                        helper = thisObject.Utility.parseInt(diff.substring(4)) * thisObject.Utility.parseInt(difficultiesCount[diff]);
                        helper1 += helper;
                    }
                }
                maxGameScore = helper1;
                return maxGameScore;
            },

            updateScore : function() {
                var i = 0,
                    helper = 0;

                for ( i = 0; i < wavePointsArray.length; i += 1) {
                    helper += wavePointsArray[i];
                }
                score = helper;

                return score;
            },

            getGameErrors : function() {
                return gameErrors;
            },

            incrGameErrors : function() {
                gameErrors += 1;
            },

            /**
             * Returns current level number, from 0 up to WAVES_COUNT - 1
             * @method getcurrentWaveIndex
             * @return {Integer}
             */
            getCurrentWaveIndex : function() {
                return currentWaveIndex;
            },

            /**
             * Sets current wave. It doesn't allow exceeding possible values, i.e cannot be outside this range: {0, WAVES_COUNT - 1}
             * @method setcurrentWaveIndex
             * @param {Integer} waveNum
             * @return {Integer} currentWaveIndex
             */
            setCurrentWaveIndex : function(waveNum) {
                if (waveNum < 0) {
                    currentWaveIndex = 0;
                } else if (waveNum > thisObject.Const.WAVES_COUNT - 1) {
                    currentWaveIndex = thisObject.Const.WAVES_COUNT - 1;
                } else {
                    currentWaveIndex = waveNum;
                }
                return currentWaveIndex;
            },

            /**
             * Increments cureentLevel's value by 1. Cannot exceed WAVES_COUNT - 1.
             * @method incrCurrentWaveIndex
             * @return {Integer} currentWaveIndex
             */
            incrCurrentWaveIndex : function() {
                if (currentWaveIndex < thisObject.Const.WAVES_COUNT - 1) {
                    currentWaveIndex += 1;
                }
                return currentWaveIndex;
            },

            /**
             * Decrements cureentLevel's value by 1. Cannot go lower than 0.
             * @method decrCurrentWaveIndex
             * @return {Integer} currentWaveIndex
             */
            decrCurrentWaveIndex : function() {
                if (currentWaveIndex > 0) {
                    currentWaveIndex -= 1;
                }
                return currentWaveIndex;
            },

            generateScoreText : function() {
                return "Score: " + thisObject.updateScore() + "/" + thisObject.getMaxGameScore();
            },

            generateErrorsText : function() {
                return "Errors: " + thisObject.updateErrors();
            },

            generateWaveText : function(waveLength) {
                return "Wave: " + (currentWaveIndex + 1) + ", rules: " + waveLength + "/" + thisObject.Utility.getCurrentWaveLength(currentWaveIndex);
            },

            getWaveErrorsArray : function() {
                return waveErrorsArray.slice();
            },

            setWaveErrors : function(waveNum, errors) {
                var wavesCount = thisObject.Const.WAVES_COUNT;

                if (waveNum < 0) {
                    waveErrorsArray[0] = errors;
                    firstVisit = false;
                } else if (waveNum >= wavesCount) {
                    waveErrorsArray[wavesCount - 1] = errors;
                    firstVisit = false;
                } else {
                    waveErrorsArray[waveNum] = errors;
                    firstVisit = false;
                }
            },

            updateErrors : function() {
                var i = 0,
                    helper = 0;

                for ( i = 0; i < waveErrorsArray.length; i += 1) {
                    helper += waveErrorsArray[i];
                }
                gameErrors = helper;

                return gameErrors;
            },

            clearWaveErrorsArray : function() {
                var i = 0;
                waveErrorsArray = [];
                for ( i = 0; i < thisObject.Const.WAVES_COUNT; i += 1) {
                    waveErrorsArray.push(0);
                }
                gameErrors = 0;
            },

            setWavePoints : function(waveNum, points) {
                var wavesCount = thisObject.Const.WAVES_COUNT;

                if (waveNum < 0) {
                    wavePointsArray[0] = points;
                    firstVisit = false;
                } else if (waveNum >= wavesCount) {
                    wavePointsArray[wavesCount - 1] = points;
                    firstVisit = false;
                } else {
                    wavePointsArray[waveNum] = points;
                    firstVisit = false;
                }
            },

            /**
             * Returns the array that holds points about each specific level.
             * @method getLevelPointsArray
             * @param {Array} wavePointsArray
             */
            getWavePointsArray : function() {
                return wavePointsArray.slice();
            },

            clearWavePointsArray : function() {
                var i = 0;
                wavePointsArray = [];
                for ( i = 0; i < thisObject.Const.WAVES_COUNT; i += 1) {
                    wavePointsArray.push(0);
                }
                score = 0;
            },

            getGameSpeed : function() {
                return gameSpeed;
            },

            setGameSpeed : function(speed) {
                gameSpeed = speed;
            },

            clearDiffsPerWave : function() {
                var i = 0;
                difficultiesPerWave = [];
                for ( i = 0; i < thisObject.Const.WAVES_COUNT; i += 1) {
                    difficultiesPerWave.push(0);
                }
            },

            getGameDiffsPerWave : function() {
                return difficultiesPerWave;
            },

            setSandhiInvadersData : function(data) {
                sandhiInvadersData = data;
            },

            resetSandhiInvadersData : function() {
                var rawGameData = game.cache.getJSON(thisObject.Settings.SANDHI_INVADERS_DATA_JSON);
                sandhiInvadersData = thisObject.processAlphabetData(rawGameData);
                return sandhiInvadersData;
            },

            getSandhiInvadersData : function() {
                return sandhiInvadersData;
            },

            getIASTAlphabet : function() {
                return IASTAlphabet;
            },

            getDifficultiesCount : function() {
                return difficultiesCount;
            },

            updateDifficultiesCount : function(difficulty) {
                switch (thisObject.Utility.parseInt(difficulty)) {
                case 1:
                    difficultiesCount.diff1 += 1;
                    break;
                case 2:
                    difficultiesCount.diff2 += 1;
                    break;
                case 3:
                    difficultiesCount.diff3 += 1;
                    break;
                case 4:
                    difficultiesCount.diff4 += 1;
                    break;
                case 6:
                    difficultiesCount.diff6 += 1;
                    break;
                case 8:
                    difficultiesCount.diff8 += 1;
                    break;
                case 10:
                    difficultiesCount.diff10 += 1;
                    break;
                }
            },

            processAlphabetData : function(data) {
                var id,
                    i,
                    leftLetter,
                    rightLetter,
                    combinedLetter,
                    difficulty,
                    waveData = [],
                    processedData = [],
                    myIndex = 0,
                    waveNum = -1;

                thisObject.clearWavePointsArray();
                thisObject.clearDiffsPerWave();

                if (data === null || data === undefined) {
                    sandhiInvadersData = {};
                } else {
                    for (i = 1; i < data.length; i += 1) {

                        id = data[i][thisObject.Const.ID];
                        leftLetter = data[i][thisObject.Const.LEFT_LETTER];
                        rightLetter = data[i][thisObject.Const.RIGHT_LETTER];
                        combinedLetter = data[i][thisObject.Const.COMBINED_LETTER];
                        difficulty = data[i][thisObject.Const.DIFFICULTY];

                        thisObject.updateDifficultiesCount(difficulty);

                        processedData.push({
                            "ID" : id,
                            "LEFT_LETTER" : leftLetter,
                            "RIGHT_LETTER" : rightLetter,
                            "COMBINED_LETTER" : combinedLetter,
                            "DIFFICULTY" : difficulty,
                            "played" : false,
                            "userAnswerIsCorrect" : false
                        });
                    }

                    thisObject.updateMaxGameScore();
                    windowObject.localStorage.setItem(thisObject.Const.GAME_DIFFS_WS_KEY, JSON.stringify(difficultiesCount));

                    while (myIndex < thisObject.Const.MAX_NUM_OF_RULES) {
                        if (myIndex % thisObject.Const.DEFAULT_WAVE_LENGTH_40 === 0) {
                            if ((thisObject.Const.MAX_NUM_OF_RULES - myIndex) >= thisObject.Const.DEFAULT_WAVE_LENGTH_40) {
                                waveNum += 1;
                                waveData[waveNum] = [];
                            }
                        }
                        waveData[waveNum].push(processedData[myIndex]);
                        difficultiesPerWave[waveNum] += thisObject.Utility.parseInt(processedData[myIndex].DIFFICULTY);

                        myIndex += 1;
                    }

                    windowObject.localStorage.setItem(thisObject.Const.GAME_DIFFS_PER_WAVE_WS_KEY, JSON.stringify(difficultiesPerWave));
                }

                return waveData;
            },

            /**
             * addConstant(MyObject, constantName, constantValue) creates new constant in MyObject with constantName as name and
             * constantValue as value. If constantValue is null that the value of the new constant will equal to its name.
             * @method addConstant
             * @param {Object} MyObject object where this constant should be created
             * @param {String} constantName name of the new constant, usually with upper case letters and underscores.
             * @param {Object} constantValue value of the new constant. If set to null the new constant will have the name as the value.
             */
            addConstant : function(MyObject, constantName, constantValue) {
                if (constantValue === undefined || constantValue === null) {
                    constantValue = constantName;
                }
                if (MyObject === null || MyObject === undefined) {
                    MyObject = {};
                }
                Object.defineProperty(MyObject, constantName, {
                    configurable : false,
                    enumerable : true,
                    value : constantValue,
                    writable : false
                });
            },

            loadAtlasJSONHash : function(keyName, keyValue, sheetUrl, sheetConfigUrl) {
                thisObject.addConstant(thisObject.ImageAssetKeys, keyName, keyValue);
                return game.load.atlasJSONHash(thisObject.ImageAssetKeys[keyName], sheetUrl, sheetConfigUrl);
            },

            loadAtlasJSONArray : function(keyName, keyValue, sheetUrl, sheetConfigUrl) {
                thisObject.addConstant(thisObject.ImageAssetKeys, keyName, keyValue);
                return game.load.atlasJSONArray(thisObject.ImageAssetKeys[keyName], sheetUrl, sheetConfigUrl);
            },

            loadSpriteSheet : function(keyName, keyValue, url, width, height, numOfFrames) {
                thisObject.addConstant(thisObject.ImageAssetKeys, keyName, keyValue);
                return game.load.spritesheet(thisObject.ImageAssetKeys[keyName], url, width, height, numOfFrames);
            },

            loadImage : function(keyName, keyValue, url) {
                thisObject.addConstant(thisObject.ImageAssetKeys, keyName, keyValue);
                return game.load.image(thisObject.ImageAssetKeys[keyName], url);
            },

            loadAudio : function(keyName, keyValue, arrayOfUrls) {
                thisObject.addConstant(thisObject.SoundAssetKeys, keyName, keyValue);
                return game.load.audio(thisObject.SoundAssetKeys[keyName], arrayOfUrls, true);
            },

            loadJSON : function(keyName, keyValue, url) {
                thisObject.addConstant(thisObject.Settings, keyName, keyValue);
                return game.load.json(thisObject.Settings[keyName], url, true);
            },

            namespace : function(namespaceStr, inheritObject, newObject) {
                var parts = namespaceStr.split('.'),
                    helpObject = Object.create(inheritObject),
                    siObject = this,
                    i = 0,
                    prop = {};

                if (inheritObject === null || inheritObject === undefined) {
                    inheritObject = {};
                }

                if (parts[0] === siObject.Const.GAME_NAME) {
                    parts = parts.slice(1);
                }

                for ( i = 0; i < parts.length; i += 1) {
                    if (siObject[parts[i]] === undefined) {
                        for (prop in newObject) {
                            if (newObject.hasOwnProperty(prop)) {
                                helpObject[prop] = newObject[prop];
                            }
                        }
                        siObject[parts[i]] = helpObject;
                    }
                    siObject = siObject[parts[i]];
                }
                return siObject;
            },

            resetGame : function() {
                windowObject.localStorage.clear();

                thisObject.setNotDirty();
                thisObject.clearDifficutliesCount();
                thisObject.clearWavePointsArray();
                thisObject.clearDiffsPerWave();
                thisObject.clearWaveErrorsArray();
                currentWaveIndex = 0;
                thisObject.resetSandhiInvadersData();
                gameSpeed = thisObject.Const.SPEED_BEGINNER;
                thisObject.saveGame();
            },

            saveGame : function() {
                windowObject.localStorage.setItem(thisObject.Const.FIRST_VISIT_WS_KEY, firstVisit);
                windowObject.localStorage.setItem(thisObject.Const.IAST_ALPHABET_WS_KEY, JSON.stringify(IASTAlphabet));
                windowObject.localStorage.setItem(thisObject.Const.GAME_SPEED_WS_KEY, gameSpeed);
                windowObject.localStorage.setItem(thisObject.Const.WAVE_POINTS_ARRAY_WS_KEY, JSON.stringify(wavePointsArray));
                windowObject.localStorage.setItem(thisObject.Const.SANDHI_INVADERS_DATA_WS_KEY, JSON.stringify(sandhiInvadersData));
                windowObject.localStorage.setItem(thisObject.Const.GAME_DIFFS_WS_KEY, JSON.stringify(difficultiesCount));
                windowObject.localStorage.setItem(thisObject.Const.GAME_DIFFS_PER_WAVE_WS_KEY, JSON.stringify(difficultiesPerWave));
                windowObject.localStorage.setItem(thisObject.Const.WAVE_ERRORS_ARRAY_WS_KEY, JSON.stringify(waveErrorsArray));
                windowObject.localStorage.setItem(thisObject.Const.CURRENT_WAVE_INDEX, currentWaveIndex);
                windowObject.localStorage.setItem(thisObject.Const.MUTED_WS_KEY, thisObject.Utility.boolToInt(muted));
            },

            loadWebStorageData : function() {
                var storageGameErrorsArray = null,
                    storageFirstVisit = null,
                    storageGameSpeed = null,
                    storagePointsArray = null,
                    storageWaveIndex = null,
                    helperArray = [],
                    storageMuted = null;

                storageFirstVisit = windowObject.localStorage.getItem(thisObject.Const.FIRST_VISIT_WS_KEY);
                if (storageFirstVisit === null) {
                    windowObject.localStorage.setItem(thisObject.Const.FIRST_VISIT_WS_KEY, firstVisit);
                } else {
                    firstVisit = false;
                    windowObject.localStorage.setItem(thisObject.Const.FIRST_VISIT_WS_KEY, firstVisit);
                }

                storagePointsArray = windowObject.localStorage.getItem(thisObject.Const.WAVE_POINTS_ARRAY_WS_KEY);
                if (storagePointsArray === null) {
                    thisObject.clearWavePointsArray();
                    windowObject.localStorage.setItem(thisObject.Const.WAVE_POINTS_ARRAY_WS_KEY, JSON.stringify(wavePointsArray));
                } else {
                    wavePointsArray = JSON.parse(storagePointsArray);
                    thisObject.updateScore();
                }

                storageGameErrorsArray = windowObject.localStorage.getItem(thisObject.Const.WAVE_ERRORS_ARRAY_WS_KEY);
                if (storageGameErrorsArray === null) {
                    thisObject.clearWaveErrorsArray();
                    windowObject.localStorage.setItem(thisObject.Const.WAVE_ERRORS_ARRAY_WS_KEY, JSON.stringify(waveErrorsArray));
                } else {
                    waveErrorsArray = JSON.parse(storageGameErrorsArray);
                    thisObject.updateErrors();
                }

                storageGameSpeed = windowObject.localStorage.getItem(thisObject.Const.GAME_SPEED_WS_KEY);
                if (storageGameSpeed === null) {
                    gameSpeed = thisObject.Const.SPEED_BEGINNER;
                    windowObject.localStorage.setItem(thisObject.Const.GAME_SPEED_WS_KEY, gameSpeed);
                } else {
                    gameSpeed = thisObject.Utility.parseInt(storageGameSpeed);
                }

                storageWaveIndex = windowObject.localStorage.getItem(thisObject.Const.CURRENT_WAVE_INDEX);
                if (storageWaveIndex === null) {
                    currentWaveIndex = 0;
                    windowObject.localStorage.setItem(thisObject.Const.CURRENT_WAVE_INDEX, currentWaveIndex);
                } else {
                    currentWaveIndex = thisObject.Utility.parseInt(storageWaveIndex);
                }

                storageMuted = windowObject.localStorage.getItem(thisObject.Const.MUTED_WS_KEY);
                if (storageMuted === null) {
                    muted = false;
                    windowObject.localStorage.setItem(thisObject.Const.MUTED_WS_KEY, thisObject.Utility.boolToInt(muted));
                } else {
                    muted = thisObject.Utility.intToBool(thisObject.Utility.parseInt(storageMuted));
                }
            },

            loadGameCacheData : function() {
                var storageSandhiInvadersData = null,
                    storageIASTAlphabet = null,
                    storageMaxGameScore = null,
                    storageGameDiffs = null,
                    storageGameDiffsPerWave = null,
                    rawAlphabetData = null;

                storageSandhiInvadersData = windowObject.localStorage.getItem(thisObject.Const.SANDHI_INVADERS_DATA_WS_KEY);
                if (storageSandhiInvadersData === null) {
                    sandhiInvadersData = thisObject.resetSandhiInvadersData();
                    windowObject.localStorage.setItem(thisObject.Const.SANDHI_INVADERS_DATA_WS_KEY, JSON.stringify(sandhiInvadersData));
                } else {
                    sandhiInvadersData = JSON.parse(storageSandhiInvadersData);
                }

                storageIASTAlphabet = windowObject.localStorage.getItem(thisObject.Const.IAST_ALPHABET_WS_KEY);
                if (storageIASTAlphabet === null) {
                    rawAlphabetData = game.cache.getJSON(thisObject.Settings.IAST_ALPHABET_JSON);
                    IASTAlphabet = rawAlphabetData;
                    windowObject.localStorage.setItem(thisObject.Const.IAST_ALPHABET_WS_KEY, JSON.stringify(IASTAlphabet));
                } else {
                    IASTAlphabet = JSON.parse(storageIASTAlphabet);
                }

                storageGameDiffs = windowObject.localStorage.getItem(thisObject.Const.GAME_DIFFS_WS_KEY);
                if (storageGameDiffs === null) {
                    windowObject.localStorage.setItem(thisObject.Const.GAME_DIFFS_WS_KEY, difficultiesCount);
                } else {
                    difficultiesCount = JSON.parse(storageGameDiffs);
                }

                storageGameDiffsPerWave = windowObject.localStorage.getItem(thisObject.Const.GAME_DIFFS_PER_WAVE_WS_KEY);
                if (storageGameDiffsPerWave === null) {
                    windowObject.localStorage.setItem(thisObject.Const.GAME_DIFFS_PER_WAVE_WS_KEY, difficultiesPerWave);
                } else {
                    difficultiesPerWave = JSON.parse(storageGameDiffsPerWave);
                }

                thisObject.updateMaxGameScore();
            },

            addNewGameState : function(stateObject, stateKeyName) {
                thisObject.addConstant(stateObject, 'KEY', stateKeyName);
                game.state.add(stateObject.KEY, stateObject);
            },

            init : function(configObject) {

                config = configObject;

                thisObject = this;

                thisObject.Constants.init(config);
                thisObject.GameMessages.init(config);
                thisObject.GameErrors.init(config);
                thisObject.loadWebStorageData();

                game = new phaser.Game(thisObject.Const.STAGE_WIDTH, thisObject.Const.STAGE_HEIGHT, phaser.AUTO, HTML_CONTAINER);
                thisObject.gameObject = game;

                thisObject.addNewGameState(thisObject.Boot, 'BOOT');
                thisObject.addNewGameState(thisObject.Preloader, 'PRELOADER');
                thisObject.addNewGameState(thisObject.HelpScreen, 'HELP_SCREEN');
                thisObject.addNewGameState(thisObject.GameScreen, 'GAME_SCREEN');
                thisObject.addNewGameState(thisObject.GameOverScreen, 'GAME_OVER_SCREEN');
                thisObject.addNewGameState(thisObject.TestScreen, 'TEST_SCREEN');

                game.state.start(thisObject.Boot.KEY);
            }
        };
    }(window, Phaser));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var si = window.SI,
        config = {
        "event" : event
    };

    si.init(config);
});
