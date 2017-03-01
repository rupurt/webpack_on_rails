# WebpackOnRails

Use the full power of Webpack within your Rails app, leverage existing view 
helpers like `javascript_include_tag` & `stylesheet_link_tag`

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'webpack_on_rails'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install webpack_on_rails

Run the install generator to create the Webpack configuration files and an empty 
Webpack entry

```
rails g webpack_on_rails:install
```

Which creates the directory structure:

+ `client/`
  - `config/`
      + `...`
  + `entries/`
      + `webpack-application`
          + `index.js`
  - `lib/`
  - `package.json`

Install the node packages via:

### yarn

```
cd client && yarn
```

or

### npm

```
cd client && npm install
```

## Rails Template Usage

Reference your Webpack entry bundles using the standard Rails helpers

```erb
<% # app/views/layouts/application.html.erb %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <%= stylesheet_link_tag "webpack-application", media: :all %>
  </head>
  <body>
    <%= yield %>

    <%= javascript_include_tag "webpack-application" %>
  </body>
</html>
```

## Usage

In development you can run Webpack in 2 modes:

* `watch` - Recompiles on change, writes to disk, page refresh required to view changes
* `devserver` - Recompiles on change, doesn't write files to disk, can automatically reload your changes

### watch

Run the build task and allow the build to finish. This will generate the manifest 
file that sprockets uses to map logical paths `webpack-application.js` to file 
system paths `webpack-application-8f88619b6ef3a358a7ad.js` and write the build artifacts
to `public/assets`.

```
cd client && yarn run build:dev
```

Once the manifest has been generated start a Rails server.

```
rails s
```

Unfortunately sprockets doesn't currently support automatic reloading of the manifest 
file when it changes. If you add or rename any bundles you will need to `spring stop` 
and restart the Rails server. If sprockets (or one of us :)) adds support for manifest 
reloading we would be able to enable asset fingerprints in development. Thus getting us 
closer to replicating a production environment as we develop.

### devserver

Devserver can provide a faster and more efficient development workflow by hot 
reloading modules as they are recompiled.

Run the server task and allow the build to finish. This will generate the manifest 
file that sprockets uses to map logical paths `webpack-application.js` to file 
system paths `webpack-application-8f88619b6ef3a358a7ad.js`. Devserver writes the build 
artifacts to memory and serves them up via a node http server on `http://localhost:8080`

```
cd client && yarn run server
```

Once the manifest has been generated start a Rails server and set the `ASSET_HOST` environment 
variable to the devserver address.

```
ASSET_HOST=http://localhost:8080 rails s
```

## Foreman & Invoker

If you would like to manage your processes in 1 command and load environment variables from a 
file, take a look at the [foreman](https://github.com/theforeman/foreman) or [invoker](https://github.com/code-mancers/invoker) gems.

## Heroku

Follow the [instructions](https://devcenter.heroku.com/articles/nodejs-support) 
to install the ruby and node multi-buildpack. 

Create a `package.json` file in the root of the rails project.

```json
{
  "name": "MyProject",
  "version": "1.0.0",
  "description": "A description of MyProject",
  "main": "index.js",
  "cacheDirectories": [
    "client/node_modules"
  ],
  "scripts": {
    "preinstall": "cd client && npm install",
    "postinstall": "cd client && npm run build"
  }
}
```

## How Does It Work?

[webpack-sprockets-rails-manifest-plugin](https://github.com/rupurt/webpack-sprockets-rails-manifest-plugin#how-does-it-work) 
has a full description of the Webpack plugin

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/rupurt/webpack_on_rails.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
