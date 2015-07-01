# Developing Script Plugins

1. [Sample Tasks](#snippets)
2. [Current Limitations](#limitations)

## <a name="snippets"></a> Sample Tasks

Script plugins are empowered with a large set of functions through the Plugin Framework. Please refer to the API documentation [here](http://splitmedialabslimited.github.io/xui/docs/).

The following is a set of common tasks and code snippets that can be used to accomplish these functions.

*This section is under construction.*

## <a name="limitations"></a> Current Limitations

Unfortunately, the plugin framework is still at an early stage, and there are a number of limitations. The following is a list of known limitations, and their respective workarounds, if any. (These also apply to source plugins, unless otherwise specified).

* It is currently not possible to modify item properties of items not loaded in memory (mostly those items not in the active scene). Right now, there are two possible workarounds: (1) keep switching to the correct scene before getting/setting its properties, or (2) keep the items loaded in memory using `Item.prototype.setKeepLoaded()` (this is not highly recommended because it can lead to high memory usage).
