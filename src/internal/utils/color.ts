/// <reference path="../_references.ts" />

module internal.utils {

    export class Color {
        private rgb: string;
        private irgb: number;
        private bgr: string;
        private ibgr: number;

        /** Creates a Color class */
        constructor(
            props?: { rgb?: string, irgb?: number, bgr?: string, ibgr?: number }
        ) {
            if (props !== undefined) {
                if (props.rgb !== undefined) {
                    this.setRgb(props.rgb);
                }

                if (props.irgb !== undefined) {
                    this.setIrgb(props.irgb);
                }

                if (props.bgr !== undefined) {
                    this.setBgr(props.bgr);
                }

                if (props.ibgr !== undefined) {
                    this.setIbgr(props.ibgr);
                }
            }
        }

        static fromRGBString(rgb: string): Color {
            return new Color({ rgb: rgb });
        }

        static fromRGBInt(irgb: number): Color {
            return new Color({ irgb: irgb });
        }

        static fromBGRString(bgr: string): Color {
            return new Color({ bgr: bgr });
        }

        static fromBGRInt(ibgr: number): Color {
            return new Color({ ibgr: ibgr });
        }

        /** Gets RGB value */
        getRgb() {
            return this.rgb;
        }

        /** Sets RGB value */
        setRgb(rgb: string) {
            this.rgb = rgb.replace(/^#/, '');
            this.irgb = parseInt(this.rgb, 16);

            this.bgr = [this.rgb.substring(4, 6), this.rgb.substring(2, 4), 
                this.rgb.substring(0, 2)].join('');
            this.ibgr = parseInt(this.bgr, 16);
        }

        /** Gets BGR value */
        getBgr() {
            return this.bgr;
        }

        /** Sets BGR value */
        setBgr(bgr: string) {
            this.setRgb([bgr.substring(4, 6), bgr.substring(2, 4), 
                bgr.substring(0, 2)
            ].join(''));
        }

        /** Gets RGB decimal value */
        getIrgb() {
            return this.irgb;
        }

        /** Sets RGB decimal value */
        setIrgb(irgb: number) {
            let rgb = irgb.toString(16);

            while (rgb.length < 6) {
                rgb = '0' + rgb;
            }

            this.setRgb(rgb);
        }

        /** Gets BGR decimal value */
        getIbgr() {
            return this.ibgr;
        }

        /** Sets BGR decimal value */
        setIbgr(ibgr:number) {
            var bgr = ibgr.toString(16);

            while (bgr.length < 6) {
                bgr = '0' + bgr;
            }

            this.setBgr(bgr);
        }
    }
}
