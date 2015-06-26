/* globals describe, it, expect, xui, internal, beforeEach */

describe('xui.system.Window', function() {
    'use strict';

    var App = internal.App;
    var Window = xui.system.Window;
    var hwnd;
    var win;

    beforeEach(function() {
        hwnd = Number(App.callDll('xsplit.GetForegroundWindow'));
        win = Window.parse({ hwnd: hwnd });
    });

    it('hwnd should be a number', function() {
        expect(hwnd).not.toBeNaN();
    });

    it('Window.hwnd should be eqaul to hwnd', function() {
        expect(win.hwnd === hwnd).toBeTruthy();
    });

    it('Window.pid should be a number', function() {
        expect(win.getPID()).not.toBeNaN();
    });

    it('Window.title should be a string', function() {
        expect(typeof win.getTitle()).toBe('string');
    });

    it('Window.state should be a number', function() {
        expect(win.getState()).not.toBeNaN();
    });

    it('Window.detail should be a string', function() {
        expect(typeof win.getDetail()).toBe('string');
    });

    it('Window.parse should return a Window instance', function() {
        expect(Window.parse({ hwnd: hwnd })).toBeInstanceOf(Window);
    })
});
