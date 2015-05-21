/// <reference path="../defs/jasmine.d.ts" />

declare module xui.test {
    interface Matchers extends jasmine.Matchers {
        toBeInstanceOf(expected: any): boolean;
        eachToBeInstanceOf(expected: any): boolean;
    }
}

declare module jasmine {
	function addMatchers(matchers: any): void;
}

declare function expect(spy: Function): xui.test.Matchers;
declare function expect(actual: any): xui.test.Matchers;