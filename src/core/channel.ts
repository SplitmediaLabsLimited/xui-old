/// <reference path="../_references.ts" />

module xui.core {
    import iApp = internal.App;
    import Json = internal.utils.JSON;

    export interface ChannelProps {
        name: string;
        stat: string;
        channel: string;
    }

    export interface StreamDrops {
        dropped: string;
        rendered: string;
    }

    export class Channel {
        private name: string;
        private stat: string;
        private channel: string;

        /** Channel constructor, intialize name, state, and channel values */
        constructor(props: ChannelProps) {
            this.name = props.name;
            this.stat = props.stat;
            this.channel = props.channel;
        }

        /** Gets the amout of frames dropped and frames rendered  */
        getStreamDrops(): Promise<StreamDrops> {
            return new Promise((resolve) => {
                iApp.get('streamdrops:' + this.name).then((val) => {
                    var drops: string[] = val.split(','),
                        dropped: string = drops[0] || '0',
                        rendered: string = drops[1] || '0';

                    resolve({ dropped: dropped, rendered: rendered });
                });
            });
        }

        /** Gets the current duration of <stream> in microseconds  */
        getStreamTime(): Promise<string> {
            return new Promise((resolve) => {
                iApp.get('streamtime:' + this.name).then((val) => {
                    var duration: number = parseInt(val) / 10;

                    resolve(String(duration));
                });
            });
        }
    }
}