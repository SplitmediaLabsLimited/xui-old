var App = internal.App,
    Window = xui.system.Window;

describe('xui.system.Window', function() {
    var hwnd, win;

    beforeEach(function() {
        hwnd = Number(App.callDll('xsplit.GetForegroundWindow'));
        win = sWindow.parse({ hwnd: hwnd });
    });

    it('hwnd should be a number', function() {
        expect(typeof hwnd).toBe('number');
    });

    it('Window.hwnd should be eqaul to hwnd', function() {
        expect(win.hwnd === hwnd).toBeTruthy();
    });

    it('Window.pid should be a number', function() {
        expect(typeof win.pid).toBe('number');
    });

    it('Window.title should be a string', function() {
        expect(typeof win.title).toBe('string');
    });

    it('Window.state should be a number', function() {
        expect(typeof win.state).toBe('number');
    });

    it('Window.detail should be a string', function() {
        expect(typeof win.detail).toBe('string');
    });
});
