# XUI Framework

*Important note*: `xui` is not maintained any more. If you wish to develop plugins for XSplit Broadcaster, please proceed to [xjsframework/xjs](https://github.com/xjsframework/xjs/) instead.

**Table of contents**

1. Introduction
2. Getting started
3. Plugin framework API
4. Publishing your plugin
5. Tools
6. Appendix: List of libraries Used
7. Changelog

## Introduction

Plugins are important tools for extending the utility of XSplit Broadcaster. In order to allow developers to create useful plugins for the community, the XUI framework is created to encapsulate the capabilities of the application in an easy-to-understand manner.

## Getting started

To learn about the basics of XSplit Broadcaster plugins, and an introduction to developing your own, click [here](https://github.com/SplitmediaLabsLimited/xui/blob/gh-pages/guide/getting-started.md).

## Plugin framework API

XSplit Broadcaster's functions may be used by developers through the Plugin Framework. For the latest API documentation, click [here](http://splitmedialabslimited.github.io/xui/docs/).

## Tools

We provide some tools that could speed up your plugin development. To learn more, click [here](https://github.com/SplitmediaLabsLimited/xui/blob/gh-pages/guide/tooling.md).

## Publishing your plugin

*This section is under construction.*

## Appendix: List of libraries Used

The plugin framework makes use of the following libraries internally:
* [EventEmitter](https://github.com/Wolfy87/EventEmitter) (License: Unlicense)
* [di4js](https://github.com/gedbac/di4js) (License: MIT)

We do our tests using the [Jasmine test framework](http://jasmine.github.io/) [(Github)](https://github.com/jasmine/jasmine).

Our API documentation is automatically generated using [Typedoc](http://typedoc.io/) [(Github)](https://github.com/sebastian-lenz/typedoc).

## Changelog

This section details important changes to this document.

v. 0.1.0 Initial release version.
