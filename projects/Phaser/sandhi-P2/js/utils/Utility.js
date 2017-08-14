window.SI.namespace('Utility', {}, (function(si) {
        'use strict';
        var gameObject = si.gameObject,
            textStyle20White = {
            font : '20pt Arial',
            align : 'center',
            fill: 'White'
        },
            textStyleMadeBy = {
            font : '12pt Arial',
            align : 'center',
            fontWeight: 'bold'
        },
            textStyleGameTitle = {
            font : '40pt Arial',
            align : 'center',
            fontWeight: 'bold'
        },
            textStyleLog = {
            font : '12pt Arial',
            align : 'left',
            fill: 'Red',
            fontWeight: 'bold'
        },
            textStyleScreenTypingTextWhite = {
            font :'90pt Arial',
            align : 'center',
            fill: 'White'
        },
            textStyleScreenTypingTextGreen = {
            font :'70pt Arial',
            align : 'center',
            fill: 'Green'
        },
            textStyle20 = {
            font : 'bold 20pt Arial',
            align : 'center'
        },
            textStyle17 = {
            font : 'bold 17pt Arial',
            align : 'center'
        },
            textStyle12 = {
            font : 'bold 12pt Arial',
            align : 'center'
        };

        return {
            isTruthy: function (value) {
                var result = false;
                if (value) {
                    result = true;
                } else {
                    result = false;
                }
                return result;
            },

            degToRad: function (degrees) {
                return (Math.PI * degrees) / 180;
            },

            radToDeg: function (radians) {
                return (radians * 180) / Math.PI;
            },

            getIASTChar : function(charCode) {
                var iastAlphabet = si.getIASTAlphabet(),
                    i = null;

                for (i = 0; i < iastAlphabet.length; i += 1) {
                    if (iastAlphabet[i].codeValue === charCode) {
                        return iastAlphabet[i];
                    }
                }
                return null;
            },

            roundTwoPlaces : function(myNumber) {
                return Math.round(myNumber * 100) / 100;
            },

            parseInt : function(myNumber) {
                return parseInt(myNumber, 10);
            },

            getCurrentWaveLength : function(waveIndex) {
                return ((waveIndex === si.Const.WAVES_COUNT - 1) ? si.Const.LAST_WAVE_LENGTH_52 : si.Const.DEFAULT_WAVE_LENGTH_40);
            },

            createSafeArray : function(arrayObject) {
                return arrayObject.slice();
            },

            disableDisplayObject : function(item) {
                item.inputEnabled = false;
            },

            enableDisplayObject : function(item) {
                item.inputEnabled = true;
            },

            numOfElemInObject : function(myObject) {
                return Object.keys(myObject).length;
            },

            getTextStyle20White : function() {
                return textStyle20White;
            },

            getTextStyleLog : function() {
                return textStyleLog;
            },

            getTextStyleMadeBy :  function () {
                return textStyleMadeBy;
            },

            getTextStyleGameTitle: function () {
                return textStyleGameTitle;
            },

            getTextStyleScreenTypingTextWhite : function() {
                return textStyleScreenTypingTextWhite;
            },

            getTextStyleScreenTypingTextGreen : function() {
                return textStyleScreenTypingTextGreen;
            },

            getTextStyle20 : function() {
                return textStyle20;
            },

            getTextStyle17 : function() {
                return textStyle17;
            },

            getTextStyle12 : function() {
                return textStyle12;
            },

            intToBool: function (intNumber) {
                return (intNumber === 1);
            },

            boolToInt: function (myBool) {
                return (myBool ? 1 : 0);
            },

            /**
             * randomNumber(min, max), min and max are inclusive.
             * @method randomNumber
             * @param {Integer} min
             * @param {Integer} max
             * @return {Integer}
             */
            randomNumber : function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            /**
             * Creates "fading out" animation with specified group of objects. From alpha = 1 to alpha = 0;
             * @method fadeOutGroup
             * @param {Object} groupObject
             */
            fadeOutGroup : function(groupObject) {
                var tween = null;

                groupObject.forEach(function(item) {
                    var siObject = this;

                    tween = siObject.gameObject.add.tween(item).to({
                        alpha : 0
                    }, siObject.Const.FADE_DURATION, siObject.Const.TWEEN_LINEAR, true);
                }, si);
                return tween;
            },

            /**
             * Creates "fading in" animation with specified group of objects. From alpha = 0 to alpha = 1;
             * @method fadeInGroup
             * @param {Object} groupObject
             */
            fadeInGroup : function(groupObject) {
                var tween = null;

                groupObject.forEach(function(item) {
                    var siObject = this;

                    item.alpha = 0;
                    tween = siObject.gameObject.add.tween(item).to({
                        alpha : 1
                    }, siObject.Const.FADE_DURATION, siObject.Const.TWEEN_LINEAR, true);
                }, si);
                return tween;
            }
        };
    }(window.SI)));
