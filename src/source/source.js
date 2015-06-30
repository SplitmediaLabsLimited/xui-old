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
		this.lastSavedConfig = {};
		instance = this;

		this.on('message-source', function(message)
		{
			if (message.request !== undefined) 
			{
				if (message.request === 'saveConfig')
				{
					this.emit('save-config', message.data);
				}
				else if (message.request === 'revertConfig')
				{
					this.emit('revert-config', this.lastSavedConfig);
				}
			}
		});
	};

	SourceWindow.prototype = Object.create(EventEmitter.prototype);

	SourceWindow.prototype.rememberConfig = function(config)
	{
		this.lastSavedConfig = {};
		for (var key in config) // avoid referencing old object
		{
			this.lastSavedConfig[key] = config[key];
		}
	}

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

	window.MessageSource = function(message)
	{
		SourceWindow.getInstance().emit("message-source", JSON.parse(message));
	}

	window.SetConfiguration = function(configObj)
	{
		try
		{
			var data = JSON.parse(configObj);

			SourceWindow.getInstance().emit("apply-config", data);
		}
		catch (e)
		{
			// syntax error probably happened, exit gracefully
			return;
		}
	}
})();
