window.SI.namespace('Screen', window.SI.State, (function (si, phaser) {'use strict';
    var thisObject = null,
        gameObject = null;

    return {
        screenObjects: null,
        menuObjects: null,
        gameObjects: null,
        logTextField: null,
        initScreen: function () {
            thisObject = this;
            gameObject = si.gameObject;
        },
        createLogTextField: function () {

            thisObject.logTextField = gameObject.add.text(10, 10, '', si.Utility.getTextStyleLog());
            thisObject.logTextField.alpha = 0.5;
            thisObject.logTextField.wordWrapWidth = 460;
            thisObject.logTextField.wordWrap = true;

            if (si.debugMode()) {
                thisObject.logTextField.visible = true;
            } else {
                thisObject.logTextField.visible = false;
            }

            return thisObject.logTextField;
        },
        clearScreenState: function () {
            this.screenObjects = null;
        }
    };
    }(window.SI, Phaser)));

