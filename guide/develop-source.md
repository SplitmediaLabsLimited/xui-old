# Developing Source Plugins

1. [Source Plugins](#source)
2. [Handling configuration objects for Source Plugins](#configObj)
3. [Developing the configuration window](#configWindow)
4. [Miscellaneous notes](#misc)

## <a name="source"></a> Source Plugins

Source plugins are those that are added to the stage for recording. Source plugins are composed of two parts: the source HTML (also called the base HTML) and the configuration HTML, which appears when the source is right-clicked. The XUI framework provides methods to allow communication between the source and the configuration HTML. `xui.js` must be imported into both the base and the configuration in order for the components to work properly.

> **Tip**: In order to quickly develop a working prototype of a plugin, developers should host their source and configuration HTML (this may be done either remotely or locally). A user may add the plugin to their presentation by adding a Web Page URL source, and entering the URL for the source HTML. (When testing plugins, avoid adding it as a local file as certain features will not work.)

The XUI framework allows for sources to specify where their configuration HTML is hosted. This is accomplished by specifying metadata in their source HTML, as seen in the example below (if `xui.js` has been included in the source HTML, then this metadata should already be automatically processed).
```html
<meta name="config-url" content="http://www.xspl.it/plugin/config.html">
```

> **Tip**: Relative paths are also supported for the above `<meta>` tag!

There are also a number of utilities available specifically for developing and interacting with the configuration window. For more information about handling source plugin configuration (styles, saving data, etc.) through the configuration window, click [here](#configObj).  For more information about rendering/developing the configuration window (creating the interface for your plugin configuration), click [here](#configWindow). 

## <a name="configObj"></a> Handling configuration objects for Source Plugins

Source plugins can be configured in many different ways. For example, there might be a text size or a background color setting for your plugin. To achieve this configurability, each source plugin has a *configuration object* that may be persisted across sessions. This configuration object is simply a JSON object; the developer specifies the format of the object.

By using any instance of the `Item` (`xui.core.Item`) class, it is possible to save and load configuration objects. Observe the following code:

```javascript
// in source.html
document.addEventListener('xui-ready', function() {
	// always listen to ready event before executing code!
	var item = Item.getCurrentSource();
	item.loadConfig().then(function(configObj) {
		// read config object here and reapply last saved settings
	});
});
```

The configuration HTML and any global script plugins are able to apply configurations to the source HTML. The `applyConfig()` function of an `Item` object can be used to do this; it notifies the source HTML to render itself accordingly, through the `'apply-config'` event. In order to finally save a configuration object, the source HTML may call `saveConfig()`. (The usual workflow would be the configuration window sending new configurations over to the source, which will subsequently save the configuration.)

The configuration HTML, or any global script plugin, is able to apply configurations to the source HTML. They can request the source to apply a configuration by calling `applyConfig` on an Item, revert all changes by calling `revertConfig()`, or request to save the changes through `requestSaveConfig()`. Only the source is allowed to decide to request the source HTML to finalize and save the configuration by calling `saveConfig()`. The following table and code snippets demonstrate how this is achieved.

| Config/Script environment | Source environment |
| ------------------------- | ------------------ |
| calls applyConfig(config) | emits apply-config event (argument: config) |
| calls requestSaveConfig(config) | emits save-config event (argument: config) |
| calls revertConfig() | emits revert-config event (argument: savedConfig) |
| *can't save configuration* | saveConfig(configObject) |

> **Tip**: The `applyConfig()` function may be used to preview changes before finalizing them, such as when a user hovers over a specific color in a color palette in the configuration window.

```javascript
// in config.html
document.addEventListener('xui-ready', function() {
	// set a configuration on ready event
	var item = Item.getCurrentSource();
	item.applyConfig({
		color : 'red'
	}); // this notifies the source to emit an 'apply-config' event
});

// in source.html
document.addEventListener('xui-ready', function() {
	var item = Item.getCurrentSource();
	var sourceEventEmitter = xui.source.SourceWindow.getInstance(); 
	sourceEventEmitter.on('apply-config', function(config) {
		document.body.style.backgroundColor = config.color; // apply changes
	});
	sourceEventEmitter.on('revert-config', function(config) {
		document.body.style.backgroundColor = config.color;
	});
	sourceEventEmitter.on('save-config', function(config) {
		document.body.style.backgroundColor = config.color; // apply changes
		item.saveConfig(config);
	});
});
```

## <a name="configWindow"></a> Developing the configuration window

XSplit Broadcaster provides an inline frame that is used for rendering the configuration HTML. Plugin developers may use the ConfigWindow class to specify how the configuration window should be rendered. Using it is easy; the following code initializes a simple configuration window (for brevity we are omitting the `xui-ready` event listening code):

```javascript
var config = xui.config.ConfigWindow.getInstance();
config.setRenderMode(xui.config.ConfigWindow.RenderMode.FULLWINDOW);
```

This configures a very easy configuration window. However, developers may choose either of the following: *full window* (developers have full control over the look-and-feel of the configuration), or *tabbed* (developers can take advantage of the existing tabs system, and even reuse any existing core tabs: Color, Layout, and Transition). These are specified as `RenderMode.FULLWINDOW` and `RenderMode.TABBED`, respectively, under the `xui.config.ConfigWindow` namespace.

> **Tip**: The full window render mode retains XSplit's draggable title bar so there is no need to reimplement it. For simple graphical interfaces, the full window mode is recommended.

The ConfigWindow class also exposes additional methods for developers who wish to use the tabbed mode. The configuration HTML must first declare the names of its custom tabs, and then declare the order of tabs. Custom tabs are tabs for which the developer has the responsibility of implementing. Non-custom tabs refer to existing core tabs that will be reused by the plugin. (Reusable core tabs include "Color", "Layout" and "Transition".) Note that core tab names may also be used as names of custom tabs, if developers wish to implement their own content.

```javascript
config.declareCustomTabs(['Slideshow', 'Hotkeys']);
config.setTabOrder(['Slideshow', 'Hotkeys', 'Color', 'Layout', 'Transition']);
```

> **Note**: When creating a configuration window in tabbed mode, always declare your custom tabs before setting the order of tabs, or your tabs will not render correctly.

In the case of multiple custom tabs, it is the responsibility of the configuration HTML to render itself accordingly when the tab header is clicked. To assist with this, developers may subscribe to the tab change event emitted by ConfigWindow.

```javascript
config.on('set-selected-tab', function(tab) {
	// handle change of tab here
});
```

## <a name="misc"></a> Miscellaneous notes

Both the SourceWindow and ConfigWindow classes above are event emitters, with the same functionality as the EventEmitter library found [here](https://github.com/Wolfy87/EventEmitter).

