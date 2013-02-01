#!/usr/bin/env ruby

require 'sinatra'
require 'haml'

get "/" do
  @javascripts = ["jquery-1.9.0.min.js", "jquery-ui-1.10.0.custom.min.js", "data.js", "item-data.js", "temple.js", "application.js", "add-item-form.js", "item.js", "item-poll.js"]
  @stylesheets = ["application.css", "queue.css", "item.css", "add-item-form.css"]

  haml :index
end

helpers do
  def titleize(s)
    s.split('_').map{ |w| w.capitalize }.join(" ")
  end
end
