/// <reference path="../_references.ts" />

module xui.core {
    import iApp = internal.App;

    enum WindowState {
        HIDE,
        SHOWNORMAL,
        SHOWMINIMIZED,
        MAXIMIZE,
        SHOWNOACTIVATE,
        SHOW,
        MINIMIZE,
        SHOWMINNOACTIVE,
        SHOWNA,
        RESTORE
    }

    export class Window {
        private _hwnd: number;
        private _pid: number;
        private _title: string;
        private _state: number;
        private _detail: string;

        get hwnd(): number {
            return this._hwnd;
        }

        set hwnd(val: number) {
            this._hwnd = Number(val);

            this.title = iApp.callDll('xsplit.GetWindowTitle', 
                String(this._hwnd));
            this.state = Number(iApp.callDll('xsplit.GetWindowState', 
                String(this._hwnd)));
            this.pid = Number(iApp.callDll('xsplit.GetWindowProcessId', 
                String(this._hwnd)));
        }

        get pid(): number {
            return this._pid;
        }

        set pid(val: number) {
            this._pid = Number(val);
            this.detail = iApp.callDll('xsplit.GetProcessDetails', 
                String(val));
        }

        get detail(): string {
            return this._detail;
        }

        set detail(val: string) {
            this._detail = val;
        }

        get title(): string {
            return this._title;
        }

        set title(val: string) {
            this._title = val;
        }

        get state(): number {
            return this._state;
        }

        set state(val: number) {
            this._state = Number(val);
        }

        static parse(args: { hwnd: number }): Window {
            var win: Window = new Window();

            if (args.hwnd) {
                win.hwnd = args.hwnd;
            }

            return win;
        }
    }
}