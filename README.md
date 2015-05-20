# XUI Framework

## Introduction

Plugins are important tools for extending the utility of XSplit Broadcaster. In order to allow any developer to create useful plugins for the community, the XUI framework is created to encapsulate the full capabilities of the application in an easily understandable manner.

## Plugins

All plugins should include all files distributed and packaged into the XUI framework in order to work correctly.

### *Source Plugins*

Source plugins are those that are added to the stage for recording. Source plugins are composed of two parts: the source and the configuration. The source is an HTML file that will be captured in a recording or a live stream. The configuration is an HTML file that allows a user to manipulate elements within a source. The XUI framework provides methods to allow communication between the source and the configuration HTML. 

In order to quickly develop a working prototype of a plugin, developers should host their source and configuration HTML either remotely or locally. A user may add the plugin to their presentation by adding a Web Page URL source, and entering the URL for the source HTML.

Right-clicking a source opens a configuration window, which developers can implement. The XUI framework allows for sources to specify where their configuration HTML is hosted. This is accomplished by specifying metadata in their source HTML, as seen in the following example:

`<meta name="config-url" content="http://www.xspl.it/plugin/test-config.html">`

If the files from the XUI Framework have been included in the source HTML, then this metadata should already be automatically processed.

In addition to the application methods exposed by the XUI Framework, there are also a number of methods available for the rendering of the configuration HTML. For more information about developing the configuration window, check [this link](#configClass).

### *Script Plugins*

Global script plugins are powerful add-ons that leverage a larger set of functions in order to manipulate multiple sources, application properties, and other elements of XSplit Broadcaster. These are also developed using HTML, and occupy their own window. Script plugins also use the same framework as source plugins, but more functions are available to them.

## Plugin Framework

XSplit Broadcaster's functions may be used by developers through the Plugin Framework. For the latest documentation, click [here](http://splitmedialabslimited.github.io/xui/docs/).

## <a name="configClass"></a>Appendix: Developing the Source Configuration Window

XSplit Broadcaster provides an inline frame that is used for rendering the configuration HTML. Plugin developers may use the ConfigWindow class to specify how the configuration window should be rendered. Using it is easy; the following code initializes a simple configuration window:

```
var config = misc.ConfigWindow.getInstance();
config.setRenderMode(misc.ConfigWindow.RenderMode.FULLSCREEN);
```

This configures a very easy configuration window. However, developers may choose one of the following three choices: *full screen window* (developers have full control over the look-and-feel of the configuration), *embedded* (developers can take advantage of the existing tabs system, and even reuse any existing core tabs such as Layout), and *hidden* (the configuration window simply serves to run code in the background). These are specified as `RenderMode.FULLSCREEN`, `RenderMode.EMBEDDED`, and `RenderMode.HIDDEN`, respectively, under the `misc.ConfigWindow` namespace.

The ConfigWindow class also exposes additional methods for developers who wish to use the tab system (embedded mode). The configuration HTML must first declare the names of its custom tabs, and then declare the order of tabs. Custom tabs are tabs for which the developer has the responsibility of implementing. Non-custom tabs refer to existing core tabs that will be reused by the plugin. (Reusable core tabs include "Html", "Color", "Layout" and "Transition"). Note that core tab names may also be used as names of custom tabs, if developers wish to implement their own content.

```
config.declareCustomTabs(['Slideshow', 'Hotkeys']);
config.setTabOrder(['Slideshow', 'Hotkeys', 'Color', 'Layout', 'Transition']);
```

In the case of multiple custom tabs, it is the responsibility of the configuration HTML to render itself accordingly when the tab header is clicked. To assist with this, developers may subscribe to the tab change event emitted by ConfigWindow (this uses an EventEmitter implementation found [here](https://github.com/Wolfy87/EventEmitter).)

```
config.on('set-selected-tab', function(tab) {
	// handle change of tab here
});
```

The configuration window is free to use the methods provided in the XUI Framework in order to communicate with the source and with the application, but developers may opt to use the lower-level functions on the browser's external object if so desired. Results of asynchronous callbacks may be acquired by subscribing to the async callback event.

```
config.on('async-callback', function(returnObj) {
	// handle returnObj.asyncId and returnObj.result
});
```

Finally, the ConfigWindow class has a `resizeConfig(width, height)` function for resizing full-screen configuration windows, as well as a `closeConfig()` function for forcing the configuration window to close.
