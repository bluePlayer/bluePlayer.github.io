window.SI.namespace('GraphicsUtility', {}, (function(si, phaser) {'use strict';
    var floatingAnimArray = [
            "7 (1).png",
            "7 (2).png",
            "7 (3).png",
            "7 (4).png",
            "7 (5).png",
            "7 (6).png",
            "7 (7).png",
            "7 (8).png",
            "7 (9).png",
            "7 (10).png",
            "7 (11).png",
            "7 (12).png",
            "7 (13).png",
            "7 (14).png",
            "7 (15).png",
            "7 (16).png",
            "7 (17).png",
            "7 (18).png",
            "7 (19).png",
            "7 (20).png",
            "7 (21).png"
        ],

        splashAnimArray = [
            "5_00006.png",
            "5_00007.png",
            "5_00008.png",
            "5_00009.png",
            "5_00010.png",
            "5_00011.png",
            "5_00012.png",
            "5_00013.png",
            "5_00014.png",
            "5_00015.png",
            "5_00016.png",
            "5_00017.png",
            "5_00018.png",
            "5_00019.png",
            "5_00020.png",
            "5_00021.png",
            "5_00022.png",
            "5_00023.png",
            "5_00024.png"
        ],
        
        riverAnimArray = [
            "river_00000.png",
            "river_00001.png",
            "river_00002.png",
            "river_00003.png",
            "river_00004.png",
            "river_00005.png",
            "river_00006.png",
            "river_00007.png",
            "river_00008.png",
            "river_00009.png",
            "river_00010.png",
            "river_00011.png",
            "river_00012.png",
            "river_00013.png",
            "river_00014.png",
            "river_00015.png",
            "river_00016.png"
        ];

    return {
        getFloatingAnimArray: function () {
            return floatingAnimArray;
        },

        getSplashAnimArray: function () {
            return splashAnimArray;
        },

        makeNewGraphicsObject: function (current, x, y, name, parent) {

            if (si.Utility.isTruthy(current)) {
                current.destroy();
            }

            current = si.gameObject.add.graphics(x, y);
            current.name = name + "Graphics";

            if (si.Utility.isTruthy(parent)) {
                parent.addChild(current);
            }

            return current;
        },

        drawEllipse: function (graphics, x, y, width, height, bSize, bColor, bAlpha, fColor, fAlpha, name) {
            var ellipse = si.gameObject.add.graphics(x, y);

            ellipse.lineStyle(bSize, bColor, bAlpha);
            ellipse.beginFill(fColor, fAlpha);
            ellipse.drawEllipse(0, 0, width, height);
            ellipse.endFill();

            graphics.addChild(ellipse);
            ellipse.name = (si.Utility.isTruthy(name) ? (name + "Ellipse") : ("ellipse" + graphics.getChildIndex(ellipse)));

            return ellipse;
        },

        drawCircle: function (graphics, x, y, diameter, bSize, bColor, bAlpha, fColor, fAlpha, name) {
            var circle = si.gameObject.add.graphics(x, y);

            circle.lineStyle(bSize, bColor, bAlpha);
            circle.beginFill(fColor, fAlpha);
            circle.drawCircle(0, 0, diameter);
            circle.endFill();

            graphics.addChild(circle);
            circle.name = (si.Utility.isTruthy(name) ? (name + "Circle") : ("circle" + graphics.getChildIndex(circle)));

            return circle;
        },

        drawRect: function (graphics, x, y, width, height, bSize, bColor, bAlpha, fColor, fAlpha, name) {
            var rect = si.gameObject.add.graphics(x, y);

            rect.lineStyle(bSize, bColor, bAlpha);
            rect.beginFill(fColor, fAlpha);
            rect.drawRect(0, 0, width, height);
            rect.endFill();

            graphics.addChild(rect);
            rect.name = (si.Utility.isTruthy(name) ? (name + "Rect") : ("rect" + graphics.getChildIndex(rect)));

            return rect;
        },

        getEllipsePoint: function (ex, ey, ra, rb, angle) {
            var x = si.Utility.roundTwoPlaces(ex + ra * Math.cos(angle)),
                y = si.Utility.roundTwoPlaces(ey + rb * Math.sin(angle));

            return new phaser.Point(x, y);
        },

        animateWaterRipple: function () {

        }
    };
}(window.SI, Phaser)));