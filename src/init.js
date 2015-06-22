(function() {
    'use strict';

    window.addEventListener("load", function() {
        // base class dependencies
        di
            .register('App')
                .as(xui.core.App)
                .asSingleton()
            .register('View')
                .as(xui.core.View)
            .register('Scene')
                .as(xui.core.Scene)
            .register('Item')
                .as(xui.core.Item);
    });
}());
