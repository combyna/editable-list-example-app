<?php

/**
 * Combyna editable list example app
 * Copyright (c) the Combyna project and contributors
 * https://github.com/combyna/editable-list-example-app
 *
 * Released under the MIT license
 * https://github.com/combyna/editable-list-example-app/raw/master/MIT-LICENSE.txt
 */

// FIXME: Remove these shims once they are implemented properly in Uniter
function interface_exists($interfaceName) {
    return true;
}
function is_dir($path) {
    return true; // Used by CombynaBootstrap to check the cache folder exists
}
function is_readable($path) {
    return true; // Used by ExpressionParser to check the compiled parser is usable
}
function is_writable($path) {
    return true; // Used by CombynaBootstrap to check the cache folder is writable
}
function method_exists($object, $methodName) {
    return true;
}
function rtrim($string, $charlist) {
    if (substr($string, -1) === $charlist) {
        return substr($string, 0, strlen($string) - 1);
    }

    return $string;
}

class RuntimeException extends Exception {}

use Combyna\AppWithPluginExample\Combyna\BootstrapConfig;
use Combyna\Component\Framework\Bootstrap\Bootstrap;
use Combyna\Component\Framework\Originators;

// Load Composer's autoloader
require_once __DIR__ . '/../../vendor/autoload.php';

return function ($debug = false) {
    $clientBootstrap = new Bootstrap(
        new BootstrapConfig(),
        Originators::CLIENT,
        __DIR__ . '/../..',
        'dist/php',
        $debug
    );

    $container = $clientBootstrap->getContainer();

    return $container->get('combyna.client_factory');
};
