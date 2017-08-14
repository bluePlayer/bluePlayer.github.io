window.SI.namespace('HelpScreen', window.SI.Screen, (function (si) {'use strict';
    var thisObject = null,
        gameObject = null,
        currentGuide = 0,
        guidesCount = 4,
        guidesData = null,

        exitGuideButton = null,
        nextButton = null,
        prevButton = null,

        switchImages = function (imageIndex) {
            var guide = thisObject.gameObjects.getAt(imageIndex),
                guideName = guide.name;

            if (currentGuide === 0) {
                prevButton.button.visible = false;
            } else {
                prevButton.button.visible = true;
            }
            if (currentGuide === guidesCount) {
                nextButton.button.visible = false;
            } else {
                nextButton.button.visible = true;
            }
            thisObject.gameObjects.forEach(function (item) {
                var siObject = this;

                if (item.name === guideName) {
                    siObject.gameObject.add.tween(item).to({alpha: 1}, si.Const.FADE_DURATION, siObject.Const.TWEEN_LINEAR, true);
                } else {
                    item.alpha = 0;
                }
            }, si);
        };

        nextButton = {
            button: null,
            click: function () {
                var tween = gameObject.add.tween(thisObject.gameObjects.getAt(currentGuide)).to({alpha: 0}, si.Const.FADE_DURATION, si.Const.TWEEN_LINEAR, true);

                tween.onComplete.add(function () {
                    if (currentGuide < guidesCount) {
                        currentGuide += 1;
                    }
                    switchImages(currentGuide);
                }, si);
            }
        };

        prevButton = {
            button: null,
            click: function () {
                var tween = gameObject.add.tween(thisObject.gameObjects.getAt(currentGuide)).to({alpha: 0}, si.Const.FADE_DURATION, si.Const.TWEEN_LINEAR, true);

                tween.onComplete.add(function () {
                    if (currentGuide > 0) {
                        currentGuide -= 1;
                    }
                    switchImages(currentGuide);
                }, si);
            }
        };

    return {

        init: function () {

            gameObject = si.gameObject;
            thisObject = this;
            thisObject.gameObjects = gameObject.add.group();
            thisObject.menuObjects = gameObject.add.group();
            guidesData = gameObject.cache.getJSON(si.Settings.GUIDE_MESSAGES_JSON);
            guidesCount = guidesData.length - 1;
        },

        create: function () {

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
        }
    };
    }(window.SI)));
