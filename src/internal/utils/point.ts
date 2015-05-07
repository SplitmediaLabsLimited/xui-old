/// <reference path="../_references.ts" />

module internal.utils {

    export class Point {
        private x: number;
        private y: number;
        private z: number;

        /** Creates a Point class */
        constructor(props?: { x: number, y: number, z: number }) {
            this.setX(x);
            this.setY(y);
            this.setZ(z);
        }

        /** Gets the X coordinate */
        getX() {
            return this.x;
        }

        /** Sets the X coordinate */
        setX(x: number) {
            this.x = x;
        }

        /** Gets the Y coordinate */
        getY() {
            return this.y;
        }

        /** Sets the Y coordinate */
        setY(y: number) {
            this.y = y;
        }

        /** Gets the Z coordinate */
        getZ() {
            return this.z;
        }

        /** Sets the Z coordinate */
        setZ(z: number) {
            this.z = z;
        }
    }
}