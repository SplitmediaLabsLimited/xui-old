## <a name="configClass"></a>Appendix B: Developing the Source Configuration Window

XSplit Broadcaster provides an inline frame that is used for rendering the configuration HTML. Plugin developers may use the ConfigWindow class to specify how the configuration window should be rendered. Using it is easy; the following code initializes a simple configuration window:

```javascript
var config = xui.config.ConfigWindow.getInstance();
config.setRenderMode(xui.config.ConfigWindow.RenderMode.FULLSCREEN);
```

This configures a very easy configuration window. However, developers may choose one of the following three choices: *full screen window* (developers have full control over the look-and-feel of the configuration), *embedded* (developers can take advantage of the existing tabs system, and even reuse any existing core tabs such as Layout), and *hidden* (the configuration window simply serves to run code in the background). These are specified as `RenderMode.FULLSCREEN`, `RenderMode.EMBEDDED`, and `RenderMode.HIDDEN`, respectively, under the `xui.config.ConfigWindow` namespace.

The ConfigWindow class also exposes additional methods for developers who wish to use the tab system (embedded mode). The configuration HTML must first declare the names of its custom tabs, and then declare the order of tabs. Custom tabs are tabs for which the developer has the responsibility of implementing. Non-custom tabs refer to existing core tabs that will be reused by the plugin. (Reusable core tabs include "Html", "Color", "Layout" and "Transition"). Note that core tab names may also be used as names of custom tabs, if developers wish to implement their own content.

```javascript
config.declareCustomTabs(['Slideshow', 'Hotkeys']);
config.setTabOrder(['Slideshow', 'Hotkeys', 'Color', 'Layout', 'Transition']);
```

In the case of multiple custom tabs, it is the responsibility of the configuration HTML to render itself accordingly when the tab header is clicked. To assist with this, developers may subscribe to the tab change event emitted by ConfigWindow (this uses an EventEmitter implementation found [here](https://github.com/Wolfy87/EventEmitter).)

```javascript
config.on('set-selected-tab', function(tab) {
	// handle change of tab here
});
```

The configuration window is free to use the methods provided in the XUI Framework in order to communicate with the source and with the application, but developers may opt to use the lower-level functions on the browser's external object if so desired. Results of asynchronous callbacks may be acquired by subscribing to the async callback event.

```javascript
config.on('async-callback', function(returnObj) {
	// handle returnObj.asyncId and returnObj.result
});
```

Finally, the ConfigWindow class has a `resizeConfig(width, height)` function for resizing full-screen configuration windows, as well as a `closeConfig()` function for forcing the configuration window to close.
