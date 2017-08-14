window.SI.namespace('DataTable', {}, (function (si) {'use strict';
    var thisObject = this,
        gameObject = null;

    return {
        init: function () {
             gameObject = si.gameObject;

        },

        dataTable: function (rows, columns, twoDimDataArray, fontStyle) {
            var table = null,
                i = null,
                j = null;

            for (i = 0; i < rows; i += 1) {
                for (j = 0; j < columns; j += 1) {

                }
            }

            return table;
        }
    };
    }(window.SI)));