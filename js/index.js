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

const clientModule = require('../php/src/client.php');

const scriptElement = document.getElementById('appConfig');

if (!scriptElement) {
    throw new Error('Cannot find #appConfig element');
}

const fullConfigJson = scriptElement.text;
const fullConfig = JSON.parse(fullConfigJson);
const enableDebug = false;

(async () => {
    const clientFactory = await (await clientModule).getNative()(enableDebug);

    await clientFactory.onBroadcastSignal(async (signalDispatchedEvent) => {
        const signal = await signalDispatchedEvent.getSignal();
        const signalLibraryName = await signal.getLibraryName();
        const signalName = await signal.getName();
        const signalPayload = await (await signal.getPayloadStaticBag()).toNativeArray();

        console.log(`Broadcasting signal ${signalLibraryName}.${signalName}: ${JSON.stringify(signalPayload)}`);
    });

    await clientFactory.useProductionMode();
    valueProviderRepository.installProviders(clientFactory);

    const client = await clientFactory.createClient(
        fullConfig.environment,
        fullConfig.app
    );
    let appState = await client.createInitialState();

    // Navigate the client-side router to the correct route
    appState = await client.navigateTo(appState, 'app', fullConfig.route);

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
})();
