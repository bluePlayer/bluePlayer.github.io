window.SI.namespace('SIButton', {}, (function (si) {'use strict';
    var phaserButton = null,
        hoverSound = null,
        clickSound = null;

    return {
        SIButton: function (x, y, key, context, clickHandler, overHandler, outHandler, downHandler, upHandler, overSoundKey, downSoundKey,
                                overFrame, outFrame, downFrame, upFrame) {

            if (clickHandler !== null && clickHandler !== undefined && typeof clickHandler === 'function') {
                phaserButton = si.gameObject.add.button(x, y, key, clickHandler, context, overFrame, outFrame, downFrame, upFrame);

                if (overSoundKey !== null &&
                        overSoundKey !== undefined &&
                        typeof overSoundKey === 'string' &&
                        si.SoundAssetKeys.hasOwnProperty(overSoundKey)) {

                    hoverSound = si.gameObject.add.audio(si.SoundAssetKeys[overSoundKey]);

                } else {
                    hoverSound = null;
                }
                phaserButton.setOverSound(hoverSound);

                if (downSoundKey !== null &&
                        downSoundKey !== undefined &&
                        typeof downSoundKey === 'string' &&
                        si.SoundAssetKeys.hasOwnProperty(downSoundKey)) {

                    clickSound = si.gameObject.add.audio(si.SoundAssetKeys[downSoundKey]);

                } else {
                    clickSound = si.gameObject.add.audio(si.SoundAssetKeys.CLICK_SOUND);
                }
                phaserButton.setDownSound(clickSound);

                if (overHandler !== null && overHandler !== undefined && typeof overHandler === 'function') {
                    phaserButton.onInputOver.add(overHandler, context);
                }

                if (outHandler !== null && outHandler !== undefined && typeof outHandler === 'function') {
                    phaserButton.onInputOut.add(outHandler, context);
                }

                if (downHandler !== null && downHandler !== undefined && typeof downHandler === 'function') {
                    phaserButton.onInputDown.add(downHandler, context);
                }

                if (upHandler !== null && upHandler !== undefined && typeof upHandler === 'function') {
                    phaserButton.onInputUp.add(upHandler, context);
                }
            }
            return phaserButton;
        }
    };
    }(window.SI)));
