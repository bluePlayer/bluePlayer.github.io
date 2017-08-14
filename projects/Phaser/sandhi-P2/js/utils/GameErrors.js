window.SI.namespace('GameErrors', {}, (function (si) {'use strict';
    var thisObject = this;

    return {
        init: function () {
            var siErr = si.Const.GameErrors;

            si.addConstant(siErr, 'DIFFS_COUNT_OBJECT_IS_NULL_OR_UNDEFINED', "Difficutlies count object is null or undefined!");
            si.addConstant(siErr, 'WAVE_POINTS_ARRAY_IS_NULL_OR_UNDEFINED', "Wave points array is null or undefined!");
            si.addConstant(siErr, 'WAVE_ERRORS_ARRAY_IS_NULL_OR_UNDEFINED', "Wave errors array is null or undefined!");
            si.addConstant(siErr, 'SANDHI_DATA_IS_NULL_OR_UNDEFINED', "SandhiInvadersData is null or undefined!");

        }
    };
    }(window.SI)));
