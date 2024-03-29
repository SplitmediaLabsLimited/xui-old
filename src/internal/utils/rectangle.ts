/// <reference path="../_references.ts" />

module internal.utils {
    
    export class Rectangle {
        private top: number;
        private left: number;
        private width: number;
        private height: number;
        private right: number;
        private bottom: number;

        /** Gets the top value */
        getTop(): number {
            return this.top;
        }

        /** Sets the top value */
        setTop(top: number) {
            this.top = top;

            if (this.bottom !== undefined) {
                this.setHeight(Math.abs(this.top - this.bottom));
            } 
            else if (this.height !== undefined) {
                this.setBottom(this.top + this.height);
            }
        }

        /** Gets the left value */
        getLeft(): number {
            return this.left;
        }

        /** Sets the left value */
        setLeft(left: number) {
            this.left = left;

            if (this.right !== undefined) {
                this.setWidth(Math.abs(this.right - this.left));
            }
            else if (this.width !== undefined) {
                this.setRight(this.left + this.width);
            }
        }

        /** Gets the right value */
        getRight(): number {
            return this.right;
        }

        /** Sets the right value */
        setRight(right: number) {
            this.right = right;

            if (this.left !== undefined) {
                this.setWidth(Math.abs(this.right - this.left));
            }
            else if (this.width !== undefined) {
                this.setLeft(this.right - this.width);
            }
        }

        /** Gets the bottom value */
        getBottom(): number {
            return this.bottom;
        }

        /** Sets the bottom value */
        setBottom(bottom: number) {
            this.bottom = bottom;

            if (this.top !== undefined) {
                        this.setHeight(Math.abs(this.top - this.bottom));
            }
            else if (this.height !== undefined) {
                this.setTop(this.bottom - this.height);
            }
        }

        /** Gets the width value */
        getWidth(): number {
            return this.width;
        }

        /** Sets the width value */
        setWidth(width: number) {
            this.width = width;

            if (this.right !== undefined) {
                this.setLeft(this.right - this.width);
            }
            else if (this.left !== undefined) {
                this.setRight(this.left + this.width);
            }
        }

        /** Gets the height value */
        getHeight(): number {
            return this.height;
        }

        /** Sets the height value */
        setHeight(height: number) {
            this.height = height;

            if (this.top !== undefined) {
                this.setBottom(this.top + this.height);
            }
            else if (this.bottom !== undefined) {
                this.setTop(this.bottom - this.height);
            }
        }

        /** Creates a rectangle from a comma-separated string. T,L,R,B or W,H */
        static parse(str : string) : Rectangle {
            var params = str.split(','),
                rect = new Rectangle();

            if (params.length === 4) {
                rect.top = Number(params[0]);
                rect.left = Number(params[1]);
                rect.right = Number(params[2]);
                rect.bottom = Number(params[3]);
            }

            if (params.length === 2) {
                rect.width = Number(params[0]);
                rect.height = Number(params[1]);
            }
            return rect;
        }

        /** Converts a rectangle to a comma-separated string */
        toString(value?:string): string {
            var format: string = value || ':left,:top,:right,:bottom';

            format = format.replace(':left', String(this.left));
            format = format.replace(':top', String(this.top));
            format = format.replace(':right', String(this.right));
            format = format.replace(':bottom', String(this.bottom));
            format = format.replace(':width', String(this.width));
            format = format.replace(':height', String(this.height));

            return format;
        }
    }
}
