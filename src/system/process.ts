/// <reference path="../_references.ts" />

module xui.system {

    import App = internal.App;

    export class Process {

        private pid: Number;
        private detail: string;
        private hwnds: string;
        private modules: string;

        constructor(
            pid ?: Number 
        ) {
            if(pid !== undefined) {
                this.setPid(pid);
            }
        }

        getPid() {
            return this.pid;
        }

        setPid(pid: Number) {
            this.pid = pid;
            var strPid = pid.toString();
            this.detail = App.callDll('xsplit.GetProcessDetails', strPid);
            this.modules = App.callDll('xsplit.GetProcessModules', strPid);
            this.hwnds = App.callDll('xsplit.GetProcessWindowsList', strPid);
        }

        getDetail() {
            return this.detail;
        }

        getHwnds(): any {
            return this.hwnds;
        }

        getModules(): any {
            return this.modules;
        }
    }
}
