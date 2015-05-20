[API Reference](http://splitmedialabslimited.github.io/xui/docs/)

# XUI Framework

## Introduction

Plugins are important tools for extending the utility of XSplit Broadcaster. In order to allow any developer to create useful plugins for the community, the XUI framework is created to encapsulate the full capabilities of the application in an easily understandable manner.

## Plugins

All plugins should include all files distributed and packaged into the XUI framework in order to work correctly.

### *Source Plugins*

Source plugins are those that are added to the stage for recording. Source plugins are composed of two parts: the source and the configuration. The source is an HTML file that will be captured in a recording or a live stream. The configuration is an HTML file that allows a user to manipulate elements within a source. The XUI framework provides methods to allow communication between the source and the configuration HTML. 

In order to quickly develop a working prototype of a plugin, developers should host their source and configuration HTML either remotely or locally. A user may add the plugin to their presentation by adding a Web Page URL source, and entering the URL for the source HTML.

Right-clicking a source opens a configuration window, which developers can implement. The XUI framework allows for sources to specify where their configuration HTML is hosted. This is accomplished by specifying metadata in their source HTML, as seen in the following example:

> `<meta name="config-url" content="http://www.xspl.it/plugin/test-config.html">`

If the files from the XUI Framework have been included in the source HTML, then this metadata should already be automatically processed.

In addition to the application methods exposed by the XUI Framework, there are also a number of methods available for the rendering of the configuration HTML. Developers may choose one of the following three choices: full screen window (developers have full control over the look-and-feel of the configuration), embedded (developers can take advantage of the existing tabs system, and even reuse any existing core tabs such as Layout), and hidden (the configuration window simply serves to run code in the background).
