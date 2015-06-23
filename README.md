# XUI Framework

## Introduction

Plugins are important tools for extending the utility of XSplit Broadcaster. In order to allow any developer to create useful plugins for the community, the XUI framework is created to encapsulate the full capabilities of the application in an easily understandable manner.

## Plugins

All plugins should import `xui.js` in order to work correctly. This is a library containing all the methods of the XUI plugin framework.

### *Source Plugins*

Source plugins are those that are added to the stage for recording. Source plugins are composed of two parts: the source HTML (also called the base HTML) and the configuration HTML. The source/base is an HTML file that will be captured in a recording or a live stream. The configuration is an HTML file that allows a user to manipulate elements within a source. The XUI framework provides methods to allow communication between the source and the configuration HTML. `xui.js` must be imported into both the base and the configuration in order for the components to work properly.

In order to quickly develop a working prototype of a plugin, developers should host their source and configuration HTML (this may be done either remotely or locally). A user may add the plugin to their presentation by adding a Web Page URL source, and entering the URL for the source HTML.

Right-clicking a source opens a configuration window, which developers can implement. The XUI framework allows for sources to specify where their configuration HTML is hosted. This is accomplished by specifying metadata in their source HTML, as seen in the following example:
```html
<meta name="config-url" content="http://www.xspl.it/plugin/test-config.html">
```
If `xui.js` has been included in the source HTML, then this metadata should already be automatically processed.

In addition to the application methods exposed by the XUI Framework, there are also a number of methods available for the configuration window. For more information about rendering/developing the configuration window (creating HTML for your plugin configuration interface), check [this link](#configClass). For more information about handling source plugin configuration (styles, saving data, etc.) through the configuration window, check [this link](#configObject).

### *Script Plugins*

Global script plugins are powerful add-ons that leverage a larger set of functions in order to manipulate multiple sources, application properties, and other elements of XSplit Broadcaster. These are also developed using HTML, and occupy their own window. Script plugins also use the same framework as source plugins, but more functions are available to them. Simply include `xui.js` into your script plugin to use the framework.

## Plugin Framework

XSplit Broadcaster's functions may be used by developers through the Plugin Framework. For the latest documentation, click [here](http://splitmedialabslimited.github.io/xui/docs/).

## <a name="configObject"></a>Appendix A: Handling configuration objects for Source Plugins

Source plugins can be configured in many different ways. For example, there might be a text size or a background color setting for your plugin. To achieve this configurability, each source plugin has a configuration object that may be persisted across sessions. This configuration object is simply a JSON object; the developer specifies the format of the object.

By using any instance of the `Item` (`xui.core.Item`) class, it is possible to save and load configuration objects. Observe the following code:

```javascript
// executed within the source HTML on load
var item = Item.getCurrentSource();
item.loadConfig().then(function(config) {
	// read config object here and reapply last saved settings
});
```

The configuration HTML and any global script plugins are able to apply configurations to the source HTML. The `applyConfig()` function can be used to do this; it notifies the source HTML to render itself accordingly, through the `'apply-config'` event. This function may be used to preview changes before finalizing them, such as when a user hovers over a specific color in a color palette displayed in the configuration window. In order to finally save a configuration object, the source HTML may call `saveConfig()`.

```javascript
// called from the config HTML
var item = Item.getCurrentSource();
item.applyConfig({
	color : 'red'
}); // this notifies the source to emit an 'apply-config' event

// called from the source HTML
var item = Item.getCurrentSource();
var sourceEventEmitter = xui.source.SourceWindow.getInstance();
sourceEventEmitter.on('apply-config', function(config) {
	document.body.style.backgroundColor = config.color; // apply requested changes
	item.saveConfig(config); // only the source may finalize and save its config
});
```

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
