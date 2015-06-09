/// <reference path="../_references.ts" />

import iApp = internal.App;
import sWindow = xui.system.Window;

describe('xui.system.Window', () => {
    var hwnd: number;
    var win: sWindow;

    beforeEach(() => {
        hwnd = Number(iApp.callDll('xsplit.GetForegroundWindow'));
        win = sWindow.parse({ hwnd: hwnd });
    });

    it('hwnd should be a number', () => {
        expect(typeof hwnd).toBe('number');
    });

    it('Window.hwnd should be eqaul to hwnd', () => {
        expect(win.hwnd === hwnd).toBeTruthy();
    });

    it('Window.pid should be a number', () => {
        expect(typeof win.pid).toBe('number');
    });

    it('Window.title should be a string', () => {
        expect(typeof win.title).toBe('string');
    });

    it('Window.state should be a number', () => {
        expect(typeof win.state).toBe('number');
    });

    it('Window.detail should be a string', () => {
        expect(typeof win.detail).toBe('string');
    });
});
