window.SI.namespace('IASTAlphabet', {}, (function (si) {'use strict';
    var gameObject = si.gameObject,
        gameScreen = si.GameScreen,
        thisObject = null,
        alphabet = "a ā i ī u ū ṛ ṝ ḷ ḹ ṁ ḥ k kh g gh ñ c ch j jh ṅ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m ś ṣ s h y r l v",
        analogs = "a -a i -i u -u r. -r. l. -l. .m h. k kh g gh ~n c ch j jh .n t. t.h d. d.h n. t th d dh n p ph b bh m 's s. s h y r l v",
        alphabetData = si.getIASTAlphabet();

    return {

        getIASTAlphabet: function () {
            return alphabet;
        },

        getIASTAnalogAlphabet: function () {
            return analogs;
        },

        generateAlphabet: function () {
            var data = alphabet.split(" "),
                analogsData = analogs.split(" ");

            data.forEach(function (crv, index, arr) {
                var code = crv.charCodeAt(0);

                alphabetData[index] = {str: crv, codeValue: code, analog: analogsData[index]};
            });
        }

    };
    }(window.SI)));
