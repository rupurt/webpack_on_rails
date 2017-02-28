require "rails/generators"

module WebpackOnRails
  module Generators
    class ExampleGenerator < Rails::Generators::Base
      source_root File.expand_path("../templates", __FILE__)

      def create_webpack_application_entry
        empty_directory "client/entries/webpack-application"

        template "client/entries/webpack-application/index.js", "client/entries/webpack-application/index.js"
        template "client/entries/webpack-application/index.scss", "client/entries/webpack-application/index.scss"
        template "client/entries/webpack-application/variables.scss", "client/entries/webpack-application/variables.scss"
      end

      def create_webpack_application_scaffold
        template "app/controllers/webpacks_controller.rb", "app/controllers/webpacks_controller.rb"
        template "app/views/layouts/webpacks.html.erb", "app/views/layouts/webpacks.html.erb"
        template "app/views/webpacks/index.html.erb", "app/views/webpacks/index.html.erb"

        route "resources :webpacks, only: :index"
      end
    end
  end
end
