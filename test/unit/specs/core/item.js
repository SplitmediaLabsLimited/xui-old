/* globals describe, it, expect, beforeAll, xui, internal */

// @TODO: Test all methods of Item class and it's amazing sub classes
describe('xui.core.Item', function() {
    'use strict';

    var scene = new xui.core.Scene({ id: 3, viewID: 0 });
    var item;

    beforeAll(function(done) {
        if (internal.Environment.isScriptPlugin()) {
            scene.getItems().then(function(items) {
                item = items[0];
                done();
            });
        } else {
            xui.core.Item.getCurrentSource().then(function(ret) {
                item = ret;
                done();
            });
        }
    });

    describe('should be able to fetch', function() {
        var type = '';

        it('the current item', function() {
            if (internal.Environment.isScriptPlugin()) {
                expect(xui.core.Item.getCurrentSource).toThrow();
            } else {
                expect(xui.core.Item.getCurrentSource()).toBeInstanceOf(Promise);
            }
        });

        it('the name', function(done) {
            item.getName().then(function(val) {
                expect(val).toBeDefined();
                done();
            });
        });

        it('the type', function(done) {
            item.getType().then(function(val) {
                expect(val).not.toBeNaN();
                type = Number(val);
                done();
            });
        });

        it('the value', function(done) {
            item.getValue().then(function(val) {
                if (type === 5 || type === 7) {
                    expect(val).toBeInstanceOf(internal.utils.XML);
                } else {
                    expect(typeof val).toBe('string');
                }
                done();
            });
        });

        it('the save source in memory setting', function(done) {
            item.getKeepLoaded().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the ID', function(done) {
            item.getID().then(function(val) {
                expect(val).toBeDefined();
                done();
            });
        });

        it('the Scene ID', function(done) {
            item.getSceneID().then(function(val) {
                expect(val).not.toBeNaN();
                done();
            });
        });

        it('the View ID', function(done) {
            item.getViewID().then(function(val) {
                expect(val).not.toBeNaN();
                done();
            });
        });

        // ItemAudio
        it('the volume', function(done) {
            item.getVolume().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(101);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the mute status', function(done) {
            item.isMuted().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        // ItemChroma
        it('the chroma enabled status', function(done) {
            item.isChromaEnabled().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the chroma brightness', function(done) {
            item.getChromaBrightness().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(256);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the chroma saturation', function(done) {
            item.getChromaSaturation().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(256);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the chroma hue', function(done) {
            item.getChromaHue().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(181);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the chroma type', function(done) {
            item.getChromaType().then(function(val) {
                var chromaTypes = xui.core.ChromaTypes;
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(Object.keys(chromaTypes).length / 2);
                expect(val).toBeGreaterThan(chromaTypes[chromaTypes[0]] - 1);
                done();
            });
        });

        it('the chroma color', function(done) {
            item.getChromaColor().then(function(val) {
                expect(val).toBeInstanceOf(internal.utils.Color);
                done();
            });
        });

        it('the chroma primary color', function(done) {
            item.getChromaPrimaryColor().then(function(val) {
                var chromaPColors = xui.core.ChromaPrimaryColors;
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(Object.keys(chromaPColors).length / 2);
                expect(val).toBeGreaterThan(chromaPColors[chromaPColors[0]] - 1);
                done();
            });
        });

        it('the chroma balance', function(done) {
            item.getChromaBalance().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(256);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the chroma anti alias', function(done) {
            item.getChromaAntiAlias().then(function(val) {
                var chromaAA = xui.core.ChromaAntiAlias;
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(Object.keys(chromaAA).length / 2);
                expect(val).toBeGreaterThan(chromaAA[chromaAA[0]] - 1);
                done();
            });
        });

        it('the chroma threshold', function(done) {
            item.getChromaThreshold().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(256);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the chroma threshold anti alias', function(done) {
            item.getChromaThresholdAA().then(function(val) {
                expect(val).not.toBeNaN();
                done();
            });
        });

        // ItemColor
        it('the transparency', function(done) {
            item.getTransparency().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(256);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the brightness level', function(done) {
            item.getBrightness().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(101);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the contrast', function(done) {
            item.getContrast().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(101);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the hue', function(done) {
            item.getHue().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(181);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the saturation', function(done) {
            item.getSaturation().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(100);
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });

        it('the border color', function(done) {
            item.getBorderColor().then(function(val) {
                expect(val).toBeInstanceOf(internal.utils.Color);
                done();
            });
        });

        // ItemLayout
        it('the aspect ratio settings', function(done) {
            item.isKeepAspectRatio().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the position lock settings', function(done) {
            item.isPositionLocked().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the enhance resize settings', function(done) {
            item.isEnhanceResizeEnabled().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the pixel alignment settings', function(done) {
            item.isPixelAlignmentEnabled().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });

        it('the position', function(done) {
            item.getPosition().then(function(val) {
                expect(val).toBeInstanceOf(internal.utils.Rectangle);
                done();
            });
        });

        // ItemPlayback
        it('the playback start position', function(done) {
            item.getPlaybackStartPos().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });
        
        it('the playback end position', function(done) {
            item.getPlaybackEndPos().then(function(val) {
                expect(val).not.toBeNaN();
                expect(val).toBeGreaterThan(-1);
                done();
            });
        });
        
        it('the playback end action', function(done) {
            item.getPlaybackEndAction().then(function(val) {
                var action = xui.core.PlaybackEndAction;
                expect(val).not.toBeNaN();
                expect(val).toBeLessThan(Object.keys(action).length / 2);
                expect(val).toBeGreaterThan(action[action[0]] - 1);
                done();
            });
        });
        
        it('the playback duration', function(done) {
            item.getPlaybackDuration().then(function(val) {
                expect(val).not.toBeNaN();
                done();
            });
        });

        // ItemVideo
        it('the cue points', function(done) {
            item.getCuePoints().then(function(val) {
                expect(val).toBeInstanceOf(Array);
                val.forEach(function(num, idx, arr) {
                    expect(num).not.toBeNaN();
                    if (idx === (arr.length - 1)) {
                        done();
                    }
                });
            });
        });

        // ItemWindow
        it('the window tracking settings', function(done) {
            item.isWindowTracking().then(function(val) {
                expect(typeof val).toBe('boolean');
                done();
            });
        });
    });

    it('should be able to parse itself to XML', function() {
        expect(item.toXML()).toBeInstanceOf(internal.utils.XML);
    });

    describe('should be able to', function() {
        var config = '';

        it('load the configuration', function(done) {
            item.loadConfig().then(function(val) {
                if (val) {
                    expect(typeof val).toBe('object');
                    config = val;
                } else {
                    expect(val).toBeNull();
                }
                done();
            });
        });

        it('save the configuration', function() {
            if (internal.Environment.isSourceHtml()) {
                expect(item.saveConfig(config)).toBeUndefined();
            } else {
                expect(item.saveConfig).toThrow();
            }
        });

        it('apply the configuration', function(done) {
            expect(item.applyConfig).not.toThrow();
            if (internal.Environment.isSourceHtml()) {
                var emitter = xui.source.SourceWindow.getInstance();
                item.applyConfig(config);
                emitter.on('apply-config', function(config) {
                    expect(config).toEqual(config);
                    done();
                });
                done();
            } else {
                done();
            }
        });
    });
});
