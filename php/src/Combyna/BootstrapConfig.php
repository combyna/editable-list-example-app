<?php

/**
 * Combyna editable list example app
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/combyna/editable-list-example-app
 *
 * Released under the MIT license
 * https://github.com/combyna/editable-list-example-app/raw/master/MIT-LICENSE.txt
 */

namespace Combyna\AppWithPluginExample\Combyna;

use Combyna\Component\Framework\Bootstrap\BootstrapConfigInterface;
use Combyna\Plugin\ExampleGui\ExampleGuiPlugin;
use Combyna\Plugin\Gui\GuiPlugin;

class BootstrapConfig implements BootstrapConfigInterface
{
    /**
     * {@inheritdoc}
     */
    public function getPlugins()
    {
        return [
            new GuiPlugin(),
            new ExampleGuiPlugin()
        ];
    }
}
