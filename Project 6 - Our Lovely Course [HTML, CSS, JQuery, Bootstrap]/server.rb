#!/usr/bin/ruby -w
require 'webrick'
server = WEBrick::HTTPServer.new(Port: 8080, DocumentRoot: ?.)
server.start
Signal.trap(2) { server.shutdown }
