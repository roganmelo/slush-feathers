# slush-feathers
> ⚡️ A slush generator for creating feathers application

## Installation

First you need install [slush](http://slushjs.github.io/).

```bash
npm install -g slush
```

Then install the feathers generator.

```bash
npm install -g slush slush-feathers
```

## Usage

Generate your app, navigate to project directory and follow the prompts.

```bash
slush feathers
```

Inside the project directory start your brand new app! 💥

```bash
npm start
```

## Available commands

```bash
# short alias for generate new application
slush feathers

# set up authentication
slush feathers:authentication

# generate new base service with a model
slush feathers:base

# generate new feature service that extends a base or not
slush feathers:feature

# generate new hook
slush feathers:hook

# generate new middleware
slush feathers:middleware
```

## Contributing

To contribute PRs for these generators, you will need to clone the repo
then inside the repo's directory, run `npm link`. This sets up a global
link to your local package for running tests and generating
new feathers apps/services/hooks/etc.

When finished testing, optionally run `npm uninstall slush-feathers` to remove
the link.

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).