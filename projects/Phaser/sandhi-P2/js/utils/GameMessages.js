window.SI.namespace('GameMessages', {}, (function (si, phaser) {'use strict';
    var thisObject = this;

    return {
        init : function(configObject) {
            var siMsg = si.Const.GameMessages;

            si.addConstant(siMsg, 'CORRECT_ANSWER_MSG', 'Correct');
            si.addConstant(siMsg, 'WRONG_ANSWER_MSG', 'Wrong letters, try again!');
            si.addConstant(siMsg, 'FINISHED_LOADING_FILES_MSG', 'Finished loading files!');
            si.addConstant(siMsg, 'FINISHED_PACKING_FILES_MSG', 'Finished packing files!');
            si.addConstant(siMsg, 'REPORT_A_BUG_MSG', 'Report a bug at spinnerbox2000 [a] gmail [dot] com');
            si.addConstant(siMsg, 'MADE_BY_MSG', 'Version: ' + si.Const.VERSION + '. Made with Phaser '+ phaser.VERSION +' by Spinnerbox.\n http://www.vedicsociety.com/ Copyright ' + String.fromCharCode(169) +' July 2017');
        }
    };
    }(window.SI, Phaser)));
