window.SI.namespace('GraphicsUtility', {}, (function(si, phaser) {'use strict';
    return {
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