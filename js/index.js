/**
 * Combyna editable list example app
 * Copyright (c) the Combyna project and contributors
 * https://github.com/combyna/editable-list-example-app
 *
 * Released under the MIT license
 * https://github.com/combyna/editable-list-example-app/raw/master/MIT-LICENSE.txt
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {
    builtinTriggerMappingRepository,
    PageViewComponent,
    reactElementFactoryRepository,
    valueProviderRepository
} from 'combyna-gui-plugin/react';
import exampleReactGuiPlugin from 'combyna-example-gui-plugin';

// FIXME: Require the plugin once that has been published in PHPRuntime
require('phpruntime/sync').install({
    functionGroups: [
        require('phpruntime/src/builtin/functions/pcre/basicSupport')
    ]
});

const clientModule = require('../php/src/client.php')();

// Hook stdout and stderr up to the DOM
// FIXME: Move this to phpify
clientModule.getStdout().on('data', function (data) {
    if (!console) {
        return;
    }

    console.info(data);
});
clientModule.getStderr().on('data', function (data) {
    if (!console) {
        return;
    }

    console.warn(data);
});

const scriptElement = document.getElementById('appConfig');

if (!scriptElement) {
    throw new Error('Cannot find #appConfig element');
}

const fullConfigJson = scriptElement.text;
const fullConfig = JSON.parse(fullConfigJson);
const enableDebug = false;
const clientFactory = clientModule.execute().getNative()(enableDebug);

clientFactory.onBroadcastSignal((signalDispatchedEvent) => {
    const signal = signalDispatchedEvent.getSignal();
    const signalLibraryName = signal.getLibraryName();
    const signalName = signal.getName();
    const signalPayload = signal.getPayloadStaticBag().toNativeArray();

    console.log(`Broadcasting signal ${signalLibraryName}.${signalName}: ${JSON.stringify(signalPayload)}`);
});

clientFactory.useProductionMode();
valueProviderRepository.installProviders(clientFactory);

const client = clientFactory.createClient(
    fullConfig.environment,
    fullConfig.app
);
let appState = client.createInitialState();

// Navigate the client-side router to the correct route
appState = client.navigateTo(appState, 'app', fullConfig.route);

exampleReactGuiPlugin(reactElementFactoryRepository, builtinTriggerMappingRepository);

ReactDOM.render(
    <PageViewComponent
        appState={appState}
        client={client}
        reactElementFactoryRepository={reactElementFactoryRepository}
        valueProviderRepository={valueProviderRepository}
    />,
    document.getElementById('appRoot')
);
