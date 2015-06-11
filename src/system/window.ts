/// <reference path="../_references.ts" />

module xui.system {
    import iApp = internal.App;

    export enum WindowState {
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
        private _state: WindowState;
        private _detail: string;

        get hwnd(): number {
            return this._hwnd;
        }

        set hwnd(val: number) {
            this._hwnd = Number(val);

            this._pid = Number(iApp.callDll('xsplit.GetWindowProcessId', 
                String(this._hwnd)));
            this._title = iApp.callDll('xsplit.GetWindowTitle', 
                String(this._hwnd));
            this._state = Number(iApp.callDll('xsplit.GetWindowState', 
                String(this._hwnd)));
            this._detail = iApp.callDll('xsplit.GetProcessDetails',
                String(this._pid));
        }

        getPID(): number {
            return this._pid;
        }

        getTitle(): string {
            return this._title;
        }

        getState(): WindowState {
            return this._state;
        }

        getDetail(): string {
            return this._detail;
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