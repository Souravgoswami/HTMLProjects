#!/usr/bin/env crystal
require "http/server"

# Get the Address
ADDR = (ARGV.find { |x| x.split(".").size == 4 } || "0.0.0.0").tap { |x| ARGV.delete(x) }
		.split(".").map { |x| x.to_i { 0 } }.join(".")

# Get the Port
PORT = ARGV.find { |x| x.to_i { 0 } > 0 }.tap { |x| ARGV.delete(x) }.to_s.to_i { 8080 }
puts PORT

# Get the path
d = Dir.current
dir = ARGV[0] rescue d
path = Dir.exists?(dir) ? dir : Dir.exists?(File.join(d, dir)) ? File.join(d, dir) : d
listing = !!Dir.children(path).find { |x| x == "index.html" }
actual_path = listing ? File.join(path, "index.html") : path

server = HTTP::Server.new([
		HTTP::ErrorHandler.new,
		HTTP::LogHandler.new,
		HTTP::StaticFileHandler.new(path, directory_listing: !listing)
	]) do |context|
		context.response.content_type = "text/html"
		File.open(actual_path) { |file| IO.copy(file, context.response) }
end

puts "\e[1;33m:: Starting Sharing \e[38;5;75m#{actual_path}\e[1;31m on \e[38;5;226mhttp://#{ADDR}:#{PORT}\e[0m"
server.listen(::ADDR, ::PORT)
