require "rails/generators"

module WebpackOnRails
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path("../templates", __FILE__)

      def create_client_dirs
        empty_directory "client"
        empty_directory "client/config"
        empty_directory "client/config/loaders"
        empty_directory "client/config/plugins"
        empty_directory "client/entries"
        empty_directory "client/lib"

        create_file "client/lib/.gitkeep"
      end

      def create_package_json
        template "client/package.json", "client/package.json"
      end

      def create_configs
        template "client/config/shared.js", "client/config/shared.js"
        template "client/config/development.js", "client/config/development.js"
        template "client/config/server.development.js", "client/config/server.development.js"
        template "client/config/production.js", "client/config/production.js"

        template "client/config/loaders/babel.js", "client/config/loaders/babel.js"
        template "client/config/loaders/font.js", "client/config/loaders/font.js"
        template "client/config/loaders/css.js", "client/config/loaders/css.js"
        template "client/config/loaders/sass.js", "client/config/loaders/sass.js"
        template "client/config/loaders/extract-text-sass.js", "client/config/loaders/extract-text-sass.js"

        template "client/config/plugins/extract-text-css.js", "client/config/plugins/extract-text-css.js"
      end

      def create_empty_webpack_application
        empty_directory "client/entries/webpack-application"

        template "client/entries/webpack-application/index.js.empty", "client/entries/webpack-application/index.js"
      end

      def set_asset_manifest_location
        append_to_file "config/initializers/assets.rb" do
          <<-ASSET_MANIFEST.strip_heredoc

            # Avoid creating the manifest file in public/assets as it can be downloaded by anyone
            Rails.configuration.assets.manifest = Rails.root.join("config", "sprockets-manifest.json")
          ASSET_MANIFEST
        end
      end

      def disable_asset_debug
        gsub_file \
          "config/environments/development.rb",
          /config\.assets\.debug\s*=\s*\w+$/,
          "config.assets.debug = false"
      end

      def replace_asset_host
        inject_into_class \
          "config/application.rb",
          "Application",
          <<-ASSET_HOST
    if ENV["ASSET_HOST"].present?
      Rails.application.config.action_controller.asset_host = proc { |source, _request|
        ENV["ASSET_HOST"]
      }
    end

          ASSET_HOST
      end
    end
  end
end
