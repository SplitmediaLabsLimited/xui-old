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
            return this.detail === undefined ? '' : this.detail ;
        }

        getHwnds(): Number[] {
            return this.hwnds === '' ? [] : this.hwnds.split(',').map(
                (element) => {
                    return Number(element);
            });
        }

        getModules(): string[] {
            return this.modules === undefined ? [] :
                this.modules.split(',').filter((element) => {
                return element !== '';
            });
        }
    }
}
