/// <reference path="../_references.ts" />

module xui.core {
    import iApp = internal.App;

    export interface IChannelProps {
        name: string;
        stat: string;
        channel: string;
    }

    export interface IStreamDrops {
        dropped: number;
        rendered: number;
    }

    export class Channel {
        private name: string;
        private stat: string;
        private channel: string;

        /** Channel constructor, intialize name, state, and channel values */
        constructor(props: IChannelProps) {
            this.name = props.name;
            this.stat = props.stat;
            this.channel = props.channel;
        }

        /** Gets the amout of frames dropped and frames rendered  */
        getStreamDrops(): Promise<IStreamDrops> {
            return new Promise((resolve) => {
                iApp.get('streamdrops:' + this.name).then((val) => {
                    var drops: string[] = val.split(','),
                        dropped: number = parseInt(drops[0]) || 0,
                        rendered: number = parseInt(drops[1]) || 0;

                    resolve({ dropped: dropped, rendered: rendered });
                });
            });
        }

        /** Gets the current duration of <stream> in microseconds  */
        getStreamTime(): Promise<number> {
            return new Promise((resolve) => {
                iApp.get('streamtime:' + this.name).then((val) => {
                    var duration: number = parseInt(val) / 10;

                    resolve(duration);
                });
            });
        }
    }
}