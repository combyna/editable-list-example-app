/**
 * Combyna editable list example app
 * Copyright (c) the Combyna project and contributors
 * https://github.com/combyna/editable-list-example-app
 *
 * Released under the MIT license
 * https://github.com/combyna/editable-list-example-app/raw/master/MIT-LICENSE.txt
 */

'use strict';

module.exports = {
    plugins: [
        require('phpruntime/src/plugin/pcre/basicSupport')
    ],
    settings: {
        phpify: {
            include: [
                'dist/php/client/**/*.php',
                'dist/php/common/**/*.php',
                'php/src/**/*.php',
                'vendor/autoload.php',
                'vendor/combyna/combyna/php/dist/**/*.php',
                'vendor/combyna/combyna/php/src/**/*.php',
                'vendor/combyna/example-gui-plugin/php/src/**/*.php',
                'vendor/combyna/gui-plugin/php/src/**/*.php',
                'vendor/combyna/php-peg/lib/**/*.php',
                'vendor/composer/**/*.php',
                '!vendor/composer/ca-bundle/',
                '!vendor/composer/semver/**',
                'vendor/symfony/config/**/*.php',
                '!vendor/symfony/config/DependencyInjection/ConfigCachePass.php',
                '!vendor/symfony/config/Loader/FileLoader.php',
                '!vendor/symfony/config/Resource/GlobResource.php',
                '!vendor/symfony/config/Resource/ReflectionClassResource.php',
                '!vendor/symfony/config/Tests/**',
                'vendor/symfony/dependency-injection/**/*.php',
                '!vendor/symfony/dependency-injection/Compiler/**',
                '!vendor/symfony/dependency-injection/Tests/**',
                '!vendor/symfony/dependency-injection/ContainerAwareTrait.php',
                '!vendor/symfony/dependency-injection/ContainerBuilder.php', // WARNING: We're going to have to implement generators soon!
                '!vendor/symfony/dependency-injection/Dumper/PhpDumper.php',
                '!vendor/symfony/dependency-injection/Loader/XmlFileLoader.php',
                'vendor/symfony/event-dispatcher/**/*.php',
                '!vendor/symfony/event-dispatcher/Tests/**',
                'vendor/symfony/routing/**/*.php',
                '!vendor/symfony/routing/DependencyInjection/RoutingResolverPass.php',
                '!vendor/symfony/routing/Tests/**',
                '!vendor/symfony/routing/RouterInterface.php',
                'vendor/symfony/translation/**/*.php',
                '!vendor/symfony/translation/Resources/bin/translation-status.php',
                '!vendor/symfony/translation/Command/XliffLintCommand.php',
                '!vendor/symfony/translation/Tests/**',
                '!vendor/symfony/translation/Util/ArrayConverter.php',

                // Include these required polyfill modules, they will be stubbed below
                'vendor/symfony/polyfill-ctype/bootstrap.php',
                'vendor/symfony/polyfill-mbstring/bootstrap.php',

                '!vendor/symfony/**/*Configurator.php', // WARNING: This is just because they `use` traits
                '!vendor/symfony/**/*Trait.php' // WARNING: We're going to have to implement traits soon!
            ],
            stub: {
                // Stub these required polyfill modules
                'vendor/symfony/polyfill-ctype/bootstrap.php': null,
                'vendor/symfony/polyfill-mbstring/bootstrap.php': null
            }
        },
        phptojs: {
            'lineNumbers': true,
            'mode': 'psync'
        }
    }
};
