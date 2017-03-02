# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'webpack_on_rails/version'

Gem::Specification.new do |spec|
  spec.name          = "webpack_on_rails"
  spec.version       = WebpackOnRails::VERSION
  spec.authors       = ["Alex Kwiatkowski"]
  spec.email         = ["alex+git@rival-studios.com"]

  spec.summary       = %q{Use the full power of Webpack within your Rails app}
  spec.description   = %q{Use the full power of Webpack within your Rails app, leverage existing view helpers like javascript_include_tag & stylesheet_link_tag}
  spec.homepage      = "https://github.com/rupurt/webpack_on_rails"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.14"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "rails", ">= 4.0"
end
