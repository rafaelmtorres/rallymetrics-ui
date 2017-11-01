# `rallymetrics-ui` — A Rallymetrics frontend application

An app to track R9 releases metrics.

## Getting Started

To get you started you can simply clone the `rallymetrics-ui` repository and install the dependencies:

### Prerequisites

You need git to clone the `rallymetrics-ui` repository. You can get git from https://bitbucket.es.ad.adp.com/projects/PORTAL/repos/rallymetrics-ui/browse.

We also use a number of Node.js tools to initialize `rallymetrics-ui`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `rallymetrics-ui`

Clone the `rallymetrics-ui` repository using git:

```
git clone https://[USER]@bitbucket.es.ad.adp.com/scm/portal/rallymetrics-ui.git
cd rallymetrics-ui
```

### Install Dependencies

We have basically two types of dependencies. Development dependencies and libraries and frameworks.
Dependencies all managed by npm but you can use Yarn to install them as well.

To install all projects dependecies just run:

npm install

* `node_modules` - contains the npm packages for the tools we need
* `package.json` - list all dependecies we have

After installing the app dependencies you must build using webpack. It's simple as:

npm run build

This will generate the bundle.js files used to load libraries and app dependencies in the
index.html.

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:


npm start or npm run server

Both are preconfigured to run Webpack-dev-server

Now browse to the app at [`localhost:8000/index.html`][local-app-url].


## Directory Layout

```
app/                    --> all of the source files for the application
  common/               --> Common views and libraries to be used across components
  components/           --> Directives to be used in the application
  config/               --> Config files and js objects
  interceptors/         --> Interceptors used across the application
  releases/             --> Release's page components
  report/               --> Report's page components
  app.module.js                --> main application module
  app.routes.js                --> Angular routes used in the application
  index.html            --> app layout file (the main html template file of the app)
dist/                   --> Bundle files generated by webpack
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
node_modules/         --> Dependencies installed by npm
public/               --> css files used in the app
    app.cs
    dashboard.css
protractor-conf.js    --> Protractor config file
scenarios.js          --> end-to-end scenarios to be run by Protractor
```

## Updating Angular

Since the Angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools to easily update the dependencies. Simply run the preconfigured
script:

```
npm run update-deps
```

This will call `npm update` and `bower update`, which in turn will find and install the latest
versions that match the version ranges specified in the `package.json` and `bower.json` files
respectively.


## Serving the Application Files

While Angular is client-side-only technology and it is possible to create Angular web apps that
do not require a backend server at all, we recommend serving the project files using a local
web server during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, XHR,
etc to function properly when an HTML page is opened via the `file://` scheme instead of `http://`.

### Running the App during Development

The `rallymetrics-ui` project comes preconfigured with webpack and uses it's tool to run locally.

```
npm run server  -- Using webpack-dev-server
```

### Running the App in Production

This really depends on how complex your app is and the overall infrastructure of your system, but
the general rule is that all you need in production are the files under the `app/` directory.
Everything else should be omitted.

Angular apps are really just a bunch of static HTML, CSS and JavaScript files that need to be hosted
somewhere they can be accessed by browsers.

If your Angular app is talking to the backend server via XHR or other means, you need to figure out
what is the best way to host the static files to comply with the same origin policy if applicable.
Usually this is done by hosting the files by the backend server or through reverse-proxying the
backend server(s) and web server(s).



[angularjs]: https://angularjs.org/
[git]: https://git-scm.com/
[http-server]: https://github.com/indexzero/http-server
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[local-app-url]: http://localhost:8000/index.html
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[travis]: https://travis-ci.org/
[travis-docs]: https://docs.travis-ci.com/user/getting-started
