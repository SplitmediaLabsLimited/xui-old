/* globals window, EventEmitter */

(function()
{
	'use strict';

	/** This class is an EventEmitter for certain events related
	 *  to the base/source HTML of a source plugin.
	 */

	var instance;

	var SourceWindow = function()
	{
		window.SetConfiguration = function(configObj)
		{
			try
			{
				var data = JSON.parse(configObj);
			}
			catch (e)
			{
				// syntax error probably happened, exit gracefully
				return;
			}

			instance.emit("apply-config", data);
		}

		instance = this;
	};

	SourceWindow.prototype = Object.create(EventEmitter.prototype);

	SourceWindow.getInstance = function()
	{
		if (instance === undefined)
		{
			instance = new SourceWindow();
		}
		return instance;
	};

	if (window.xui === undefined)
	{
		window.xui = {};
	}

	if (window.xui.source === undefined)
	{
		window.xui.source = {};
	}

	window.xui.source.SourceWindow = SourceWindow;
})();
