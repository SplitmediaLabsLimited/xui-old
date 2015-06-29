## Plugins

### Types of Plugins

Using the framework, developers can create two types of plugins: source plugins and global script plugins. Source plugins are added to the stage in a specific scene to be captured in a recording or a live stream, while script plugins exist within their own window, and are capable of manipulating the entire application and the whole set of scenes the user is working with. 

> Figure 1. A Source Plugin ![Image of a source plugin](img/source.png)

Figure 1 shows an example of a source plugin, the Whiteboard, and its corresponding configuration window. A source plugin is developed in HTML, and is composed of two parts: the source/base HTML and the configuration HTML. The framework provides utilities to allow communication between the base and the configuration. For more information on developing these, please read [Developing the Source HTML](#todo) and [Developing the Source's Configuration Window](#todo) for more details.

> Figure 2. A Global Script Plugin ![Image of a script plugin](img/script.png)

Figure 2 shows an example of a global script plugin (Currently in development). Script plugins are powerful tools that are able to access more functions than a single source plugin can. They can manipulate scenes, switch between them, and even add new objects to the active scene. More information can be found at [Developing Script Plugins](#todo).


### Developing Plugins

All plugins of all types (source and script plugins) should import `xui.js` in order to work correctly. This is a library containing all the methods of the XUI plugin framework that may be used to develop any type of plugin. **Important note:** All plugin logic should be performed after the `xui-ready` event is triggered on the `document` object. This ensures that all initialization is complete. Using the framework's methods before the event is triggered might result in unexpected errors.

```javascript
document.addEventListener('xui-ready', function() { 
	// plugin logic goes here...
});
```

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
