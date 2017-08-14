window.SI.namespace('Boot', window.SI.State, (function (si, phaser) {'use strict';
    var gameObject = null;

    return {

        init: function () {
            gameObject = si.gameObject;
            gameObject.input.maxPointers = 1;
            gameObject.stage.disableVisibilityChange = true;

            if (gameObject.device.desktop) {
                gameObject.scale.pageAlignHorizontally = true;
            } else {
                gameObject.scale.scaleMode = phaser.ScaleManager.SHOW_ALL;
                gameObject.scale.setMinMax(si.Const.STAGE_HEIGHT, si.Const.LOWER_HEIGHT, si.Const.STAGE_WIDTH, si.Const.STAGE_HEIGHT);
                gameObject.scale.forceLandscape = true;
                gameObject.scale.pageAlignHorizontally = true;
            }
        },

        preload: function () {
            gameObject.stage.backgroundColor = si.Const.Graphics.BACKGROUND_COLOR;
            si.loadAtlasJSONHash('OTHER_GUI_ASSETS_ATLAS', null, 'assets/images/UI/otherGuiAssetsSheet.png', 'assets/settings/otherGuiAssetsHash.json');
        },

        create: function () {
            gameObject.state.start(si.Preloader.KEY);
            gameObject.state.clearCurrentState();
        },

        shutdown: function () {
            gameObject = null;
        }
    };
    }(window.SI, Phaser)));
