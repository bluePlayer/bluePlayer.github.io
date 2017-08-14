window.SI.namespace('LetterBox', {}, (function (si, phaser) {'use strict';
    var gameScreen = si.GameScreen,
        thisObject = null,
        letterBoxSound = null,
        letterSound = null,
        lettersGroup = null,
        screenObjectsGroup = null,
        letterTimer = null;

    return {

        LetterBox: function (boxX, boxY, velocity, textData) {
            var graphics = null,
                text = null,
                shiftX = (textData.length === 2 ? 10 : 15),
                shiftY = 8,
                letterBox = {
                    graphics: null,
                    boxText: null
                };

            graphics = si.gameObject.add.sprite(boxX, boxY, (textData.length < 3 ? si.ImageAssetKeys.BALLOON : si.ImageAssetKeys.BALLOON_WIDE));

            letterBox.graphics = graphics;

            si.gameObject.physics.enable(letterBox.graphics, phaser.Physics.ARCADE);

            letterBox.graphics.anchor.setTo(0.5, 0.5);
            letterBox.graphics.body.checkCollision.up = false;
            letterBox.graphics.body.checkCollision.left = false;
            letterBox.graphics.body.checkCollision.right = false;
            letterBox.graphics.body.checkCollision.down = true;
            letterBox.graphics.body.velocity.y = velocity;
            letterBox.graphics.allowGravity = false;
            letterBox.graphics.allowRotation = false;

            text = si.gameObject.add.text(boxX, boxY, textData);
            text.anchor.setTo(0.5, 0.5);
            text.fill = "black";
            text.align = "center";
            text.fontSize = 24;
            text.fontWeight = "bold";
            text.font = "Arial";
            text.x = boxX;
            text.y = boxY;

            letterBox.boxText = text;
            letterBox.paused = false;
            letterBox.visible = true;

            letterBox.pause = function () {
                letterBox.graphics.body.velocity.y = 0;
                letterBox.paused = true;
            };

            letterBox.unpause = function () {
                letterBox.graphics.body.velocity.y = si.getGameSpeed();
                letterBox.paused = false;
            };

            letterBox.flyOff = function () {
                letterBox.graphics.body.velocity.y = si.getGameSpeed();
                letterBox.paused = false;
            };

            letterBox.updatePosition = function () {
                letterBox.boxText.x = letterBox.graphics.x;
                letterBox.boxText.y = letterBox.graphics.y;
            };

            letterBox.hide = function () {
                letterBox.graphics.visible = false;
                letterBox.boxText.visible = false;
                letterBox.visible = false;
            };

            letterBox.show = function () {
                letterBox.graphics.visible = true;
                letterBox.boxText.visible = true;
                letterBox.visible = true;
            };

            letterBox.destroy = function () {
                letterBox.graphics.destroy();
                letterBox.boxText.destroy();
                letterBox.graphics = null;
                letterBox.boxText = null;
            };

            letterBox.move = function (x, y){
                letterBox.graphics.x = x;
                letterBox.graphics.y = y;
                letterBox.boxText.x = x;
                letterBox.boxText.y = y;
            };

            return letterBox;
        }
    };
    }(window.SI, Phaser)));

