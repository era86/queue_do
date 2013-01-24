require 'sinatra'

get "/" do
  @javascripts = ["jquery-1.9.0.min.js", "application.js", "jquery-ui-1.10.0.custom.min.js"]
  @stylesheets = ["application.css", "queue.css", "item.css"]

  haml :index
end

