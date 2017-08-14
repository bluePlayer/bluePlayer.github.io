window.SI.namespace('AboutScreen', window.SI.Screen, (function (si) {'use strict';
    var thisObject = null,
        gameObject = null;

    return {
        init: function () {

            gameObject = si.gameObject;
            thisObject = this;
            thisObject.gameObjects = gameObject.add.group();
            thisObject.menuObjects = gameObject.add.group();
        },

        create: function () {
            /*
               guidesData.forEach(function (crv, index, arr) {
                    var thisHelpScreen = this,
                        guideTextField = gameObject.add.text(50, 50, crv, si.Utility.getTextStyle20());

                    guideTextField.name = 'guide' + index;
                    guideTextField.wordWrap = true;
                    guideTextField.wordWrapWidth = 380;
                    guideTextField.alpha = (index === currentGuide ? 1 : 0);
                    thisHelpScreen.gameObjects.add(guideTextField);

               }, thisObject);

                nextButton.button =
                    si.SIButton.SIButton(360, 670, si.ImageAssetKeys.GUIDE_BUTTONS_SHEET, thisObject, nextButton.click,
                                            null, null, null, null, null, null, 3, 2, 2, 3);
                thisObject.menuObjects.add(nextButton.button);

                prevButton.button =
                    si.SIButton.SIButton(10, 670, si.ImageAssetKeys.GUIDE_BUTTONS_SHEET, thisObject, prevButton.click,
                                            null, null, null, null, null, null, 1, 0, 0, 1);
                thisObject.menuObjects.add(prevButton.button);

                exitGuideButton =
                    si.GoToScreen.Button(si.GameScreen.KEY, [thisObject.gameObjects, thisObject.menuObjects], 170, 670, si.ImageAssetKeys.STANDARD_BUTTONS_SHEET, thisObject,
                                            null, null, null, null, 21, 20, 20, 21);
                thisObject.menuObjects.add(exitGuideButton);

                switchImages(currentGuide);

                gameObject.world.bringToTop(thisObject.menuObjects);
            */
        }
    };
    }(window.SI)));