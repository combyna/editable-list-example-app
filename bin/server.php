<?php

/**
 * Combyna editable list example app
 * Copyright (c) the Combyna project and contributors
 * https://github.com/combyna/editable-list-example-app
 *
 * Released under the MIT license
 * https://github.com/combyna/editable-list-example-app/raw/master/MIT-LICENSE.txt
 */

use Combyna\AppWithPluginExample\Combyna\BootstrapConfig;
use Combyna\Component\Config\YamlParser;
use Combyna\Component\Framework\Bootstrap\Bootstrap;
use Combyna\Component\Framework\Combyna;
use Combyna\Component\Framework\Originators;
use Combyna\Component\Renderer\Html\HtmlRenderer;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

set_time_limit(0);

if (preg_match('/\.(?:js|map)$/', $_SERVER['REQUEST_URI'])) {
    return false; // Serve the static file
}

// Load Composer's autoloader
require_once __DIR__ . '/../vendor/autoload.php';

$serverBootstrap = new Bootstrap(new BootstrapConfig(), Originators::SERVER, __DIR__ . '/../dist/php');

$routeCollection = new RouteCollection();
$routeCollection->add('items', new Route('/'));
$routeCollection->add('about', new Route('/about'));

$requestContext = new RequestContext('/');
$matcher = new UrlMatcher($routeCollection, $requestContext);

$parameters = $matcher->match($_SERVER['REQUEST_URI']);
$routeName = $parameters['_route'];

$container = $serverBootstrap->getContainer();
/** @var Combyna $combyna */
$combyna = $container->get('combyna');
/** @var HtmlRenderer $htmlRenderer */
$htmlRenderer = $container->get('combyna.renderer.html');
/** @var YamlParser $yamlParser */
$yamlParser = $container->get('combyna.config.yaml_parser');

$environmentConfig = $yamlParser->parse(file_get_contents(__DIR__ . '/../combyna/app/environment.env.cyn.yml'));
$appConfig = $yamlParser->parse(file_get_contents(__DIR__ . '/../combyna/app/app.cyn.yml'));

$environment = $combyna->createEnvironment($environmentConfig);
$app = $combyna->createApp($appConfig, $environment);

$appState = $app->createInitialState();

$appState = $app->navigateTo($appState, 'app', $routeName);

$renderedHtml = $htmlRenderer->renderApp($appState, $app);

$fullConfigJson = json_encode([
    'environment' => $environmentConfig,
    'app' => $appConfig,
    'route' => $routeName
]);

print <<<HTML
<!DOCTYPE html>
<html>
    <head>
        <title>My example Combyna app</title>
    </head>
    <body>
        <h1>My example Combyna app</h1>

        <div id="appRoot">
            $renderedHtml
        </div>

        <script type="text/x-json" id="appConfig">$fullConfigJson</script>

        <script src="dist/client.js"></script>
    </body>
</html>
HTML;
