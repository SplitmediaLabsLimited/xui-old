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
