window.SI.namespace('GoToScreen', window.SI.SIButton, (function (si) {'use strict';
    var gameObject = si.gameObject,
        phaserButton = null,
        clickHandler = null;

    return {

        Button: function (screenKeyName, objectsToFadeOut, x, y, key, context, overHandler, outHandler, downHandler, upHandler,
                            overFrame, outFrame, downFrame, upFrame, params, callback) {

            clickHandler = this.CreateGoToScreenClickHandler(si, objectsToFadeOut, screenKeyName, params, callback);
            phaserButton = this.SIButton(x, y, key, context, clickHandler, overHandler, outHandler, downHandler, upHandler,
                                            null, null, overFrame, outFrame, downFrame, upFrame);
            return phaserButton;
        },

        CreateGoToScreenClickHandler: function (siParam, objectsToFadeOut, screenKeyName, params, callback) {
            var startState = function () {
                                    var siObject = this;

                                    siObject.gameObject.state.start(screenKeyName, true, false, params);
                                    siObject.gameObject.state.clearCurrentState();
                               };
            return function () {
                if (callback !== undefined && callback !== null && typeof callback === 'function') {
                    if (params !== null && params !== undefined) {
                        callback.apply(callback, params);
                    } else {
                        callback();
                    }
                }

                if (Array.isArray(objectsToFadeOut)) {
                    objectsToFadeOut.forEach(function (value, index, arr) {
                        siParam.Utility.fadeOutGroup(value).onComplete.add(startState, siParam);
                    });
                } else {
                    siParam.Utility.fadeOutGroup(objectsToFadeOut).onComplete.add(startState, siParam);
                }
            };
        }
    };
    }(window.SI)));
