/// <reference path="_references.ts" />

module xui.test {
    export class CustomMatcherResult implements jasmine.CustomMatcherResult {
        pass: boolean;
        message: string;

        constructor(pass: boolean, message?: string) {
            this.pass = pass;
            this.message = message;
        }
    }

    export class ToBeInstanceOf implements jasmine.CustomMatcher {
        compare(actual: any, expected:any): CustomMatcherResult {
            return new CustomMatcherResult(actual instanceof expected);
        }
    }

    export class EachToBeInstanceOf implements jasmine.CustomMatcher {
        compare(actual: any[], expected:any): CustomMatcherResult {
            var pass: boolean = true;

            for (var i = 0; i < actual.length; i++) {
                pass = (actual[i] instanceof expected);

                if (!pass) {
                    break;
                }    
            }

            return new CustomMatcherResult(pass);
        }
    }
}

beforeEach(() => {
    jasmine.addMatchers({
        toBeInstanceOf: () => {
            return new xui.test.ToBeInstanceOf();
        },

        eachToBeInstanceOf: () => {
            return new xui.test.EachToBeInstanceOf();
        }
    });
});
