/* globals window, EventEmitter */

(function()
{
	'use strict';

	/** This class is an EventEmitter for certain events related
	 *  to the base/source HTML of a source plugin.
	 */

	var instance;

	var ScriptWindow = function()
	{
		instance = this;
	};

	ScriptWindow.prototype = Object.create(EventEmitter.prototype);

	ScriptWindow.prototype.resize = function(width, height)
	{
		internal.App.postMessage(internal.App.POSTMESSAGE_SIZE,
			String(width), String(height));
	};

	ScriptWindow.getInstance = function()
	{
		if (instance === undefined)
		{
			instance = new ScriptWindow();
		}
		return instance;
	};

	if (window.xui === undefined)
	{
		window.xui = {};
	}

	if (window.xui.script === undefined)
	{
		window.xui.script = {};
	}

	window.xui.script.ScriptWindow = ScriptWindow;

	delete window.EventEmitter;
})();
