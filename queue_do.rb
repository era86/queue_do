require 'sinatra'

get "/" do
  @javascripts = ["jquery-1.9.0.min.js", "application.js"]
  @stylesheets = ["application.css", "queue.css"]

  haml :index
end

