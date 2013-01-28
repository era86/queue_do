#!/usr/bin/env ruby

require 'sinatra'
require 'haml'

get "/" do
  @javascripts = ["jquery-1.9.0.min.js", "jquery-ui-1.10.0.custom.min.js", "data.js", "item-data.js", "temple.js", "application.js"]
  @stylesheets = ["application.css", "queue.css", "item.css"]

  haml :index
end

helpers do

  def render(file, locals = {})
    Haml::Engine.new(File.open(file).readlines.join).render(Object.new, locals)
  end

end

