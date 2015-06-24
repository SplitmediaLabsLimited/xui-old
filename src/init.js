(function() {
    'use strict';

    window.addEventListener("load", function() {

        // scope into xui namespace
        xui.DependencyContainer = di;
        delete window.di;
        // base class dependencies

        xui.DependencyContainer
            .register('app')
                .as(xui.core.App)
                .asSingleton()
            .register('currentItem')
                .as(xui.core.Item.getCurrentSource)
            .register('currentScene')
                .as(xui.core.Scene.get)
            .register('mainView')
                .instance(xui.core.View.MAIN)
            .register('sourceWindow')
                .as(xui.source.SourceWindow.getInstance)
            .register('configWindow')
                .as(xui.config.ConfigWindow.getInstance);
    });
}());
