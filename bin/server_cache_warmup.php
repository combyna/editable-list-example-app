<?php

/**
 * Combyna editable list example app
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/combyna/editable-list-example-app
 *
 * Released under the MIT license
 * https://github.com/combyna/editable-list-example-app/raw/master/MIT-LICENSE.txt
 */

use Combyna\AppWithPluginExample\Combyna\BootstrapConfig;
use Combyna\Component\Framework\Bootstrap\Bootstrap;
use Combyna\Component\Framework\Originators;

// Load Composer's autoloader
require_once __DIR__ . '/../vendor/autoload.php';

// Warm the server cache
$clientBootstrap = new Bootstrap(new BootstrapConfig(), Originators::SERVER, __DIR__ . '/../dist/php');
$clientBootstrap->getContainer();
$clientBootstrap->warmUp();
