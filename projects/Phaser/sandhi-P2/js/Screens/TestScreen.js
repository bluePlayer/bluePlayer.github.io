window.SI.namespace('TestScreen', window.SI.Screen, (function (si, phaser) {'use strict';
    var thisObject = null,
        gameObject = null,
        emitter = null,
        exitGuideButton = null,
        background = null,
        outerEllipse = null,
        innerEllipse = null,
        maskEllipse = null,
        width = 50,
        width1 = 48,
        x = 200,
        alpha = 1,
        speed = 30,
        speedCounter = 0,
        polygon = null,
        polygonGr = null,
        ellipsePoints = [],
        waveDots = null,
        dotGr = null,
        i = 0,
        rx = 50,
        ry = 25,

        ripple = null,

        particleBurst = function (pointer) {
            //  Position the emitter where the mouse/touch event was
            emitter.x = pointer.x;
            emitter.y = pointer.y;

            //  The first parameter sets the effect to "explode" which means all particles are emitted at once
            //  The second gives each particle a 2000ms lifespan
            //  The third is ignored when using burst/explode mode
            //  The final parameter (10) is how many particles will be emitted in this single burst
            emitter.start(true, 2000, null, 10);
        };

    return {

        init: function () {
            gameObject = si.gameObject;
            thisObject = this;
            thisObject.gameObjects = gameObject.add.group();
            thisObject.menuObjects = gameObject.add.group();

        },

        create: function () {
            // start subsystems
            gameObject.physics.startSystem(phaser.Physics.ARCADE);

            background = si.gameObject.add.graphics();
            si.GraphicsUtility.drawRect(background, 0, 0, 480, 720, 0, 0x000000, 0, si.Const.Graphics.WATER_COLOR, 1, "waterBackground");
            thisObject.gameObjects.add(background);

            outerEllipse = si.gameObject.add.graphics();
            si.GraphicsUtility.drawEllipse(outerEllipse, 100, 100, width, 25, 0, 0x000000, 0, 0xffffff, alpha, "waterWave");
            thisObject.gameObjects.add(outerEllipse);

            innerEllipse = si.gameObject.add.graphics();
            si.GraphicsUtility.drawEllipse(innerEllipse, 100, 100, width1, 24, 0, 0x000000, 0, si.Const.Graphics.WATER_COLOR, alpha, "waterWave1");
            thisObject.gameObjects.add(innerEllipse);
            innerEllipse.isMask = true;

            maskEllipse = si.gameObject.add.graphics();
            si.GraphicsUtility.drawEllipse(maskEllipse, 100, 100, width1, 24, 0, 0x000000, 0, si.Const.Graphics.WATER_COLOR, alpha, "waterWave2");
            thisObject.gameObjects.add(maskEllipse);
            maskEllipse.isMask = true;

            emitter = si.gameObject.add.emitter(0, 0, 100);

            emitter.makeParticles(si.ImageAssetKeys.FLOWER);
            emitter.gravity = 200;

            si.gameObject.input.onDown.add(particleBurst, this);

            /*polygon = new phaser.Polygon(ellipsePoints);
            polygon.closed = false;

            polygonGr = si.gameObject.add.graphics(100, 100);
            polygonGr.lineStyle(1, 0xffffff, 1);
            polygonGr.drawPolygon(polygon.points);

            thisObject.gameObjects.add(polygonGr);*/

           ripple = gameObject.add.sprite(50, 50, si.ImageAssetKeys.RIPPLE, 0);
           ripple.animations.add('wave');
           ripple.animations.play('wave');
           thisObject.menuObjects.add(ripple);

            exitGuideButton =
                si.GoToScreen.Button(si.GameScreen.KEY, [thisObject.gameObjects, thisObject.menuObjects], 170, 670, si.ImageAssetKeys.STANDARD_BUTTONS_SHEET, thisObject,
                                        null, null, null, null, 21, 20, 20, 21);
            thisObject.menuObjects.add(exitGuideButton);
        },

        drawWave: function () {
            if (alpha > 0) {
                for (i = 0; i < 360; i += 1) {
                    ellipsePoints.push(si.GraphicsUtility.getEllipsePoint(100, 400, rx, ry, i));
                    //console.dir(ellipsePoints[i]);
                    dotGr = si.gameObject.add.graphics(ellipsePoints[i].x, ellipsePoints[i].y);
                    si.GraphicsUtility.drawCircle(dotGr, 0, 0, 1, 0, 0xffffff, 0, 0xffffff, alpha, "circle" + i + "-" + rx + "-" + ry);
                    thisObject.gameObjects.add(dotGr);

                    //dotGr.clear();
                }

                ellipsePoints = [];
                rx += 5;
                ry += 5;
            }
        },

        update: function () {
            if (speedCounter >= speed) {
                /*thisObject.drawWave();
                speedCounter = 0;

                innerEllipse.clear();
                innerEllipse = si.gameObject.add.graphics();
                si.GraphicsUtility.drawEllipse(innerEllipse, 100, 100, width, 25, 0, 0x000000, 0, si.Const.Graphics.WATER_COLOR, alpha, "waterWave1");
                thisObject.gameObjects.add(innerEllipse);
                innerEllipse.isMask = true;

                maskEllipse.clear();
                maskEllipse = si.gameObject.add.graphics();
                si.GraphicsUtility.drawEllipse(maskEllipse, 100, 100, width1, 20, 0, 0x000000, 0, si.Const.Graphics.WATER_COLOR, alpha, "waterWave2");
                thisObject.gameObjects.add(maskEllipse);
                //maskEllipse.isMask = true;

                outerEllipse.clear();
                outerEllipse = si.gameObject.add.graphics();
                si.GraphicsUtility.drawEllipse(outerEllipse, 100, 100, width, 25, 0, 0x000000, 0, 0xffffff, alpha, "waterWave");
                outerEllipse.mask = maskEllipse;
                thisObject.gameObjects.add(outerEllipse);

                width += 6;
                width1 += 6;

                x -= 3;
                alpha -= 0.2;*/
            } else {
                speedCounter += 1;
            }
        }
    };
    }(window.SI, Phaser)));
