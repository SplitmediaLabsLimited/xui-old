module internal.utils {

    export class Thread {
        private callbacks: Function[];

        constructor(callbacks: Function[]) {
            this.callbacks = callbacks;
        }

        private next(...args: any[]) {
            if (this.callbacks.length > 0) {
                var callback = this.callbacks.shift();

                args.unshift(this.next.bind(this));

                callback.apply(this, args);
            }
        }

        static sync(...callbacks: Function[]) {
            let thread = new Thread(callbacks);

            thread.next();

            return thread;
        }
    }
}
