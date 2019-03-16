# Combyna editable list example app

An example app built with [Combyna](https://github.com/combyna/combyna).

## Usage

- To get started, download the app source and build the server and client as follows:

  ```shell
  $ git clone https://github.com/combyna/editable-list-example-app.git
  $ composer install
  $ npm install
  $ npm run dev
  ```

- Then start the server:
  ```shell
  $ composer run server
  ```

- This will start a server using the PHP built-in web server on port `9000`.

- Open [the client page](http://localhost:9000/) in your browser.

- Modify the YAML app config in `combyna/app/app.cyn.yml`. Refresh to see any changes

If you'd like to dig more into the internals, read on!

## Dependencies

- The core library [Combyna can be found here](https://github.com/combyna/combyna).
- Combyna supports a plugin system for extension. The plugins below are published on both NPM and Packagist,
  as they have both PHP and JavaScript components:
  - The [base plugin for GUI components can be found here](https://github.com/combyna/gui-plugin).
  - An [example plugin with additional GUI components can be found here](https://github.com/combyna/example-gui-plugin).
- [React](https://reactjs.org/) is used for the UI rendering.
- [Uniter](https://uniter.github.io/) is used for compiling the PHP portion of the code down to JavaScript.
  The [PHPify](https://github.com/uniter/phpify) package from the Uniter project is referenced in package.json.
