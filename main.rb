#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require './rdio'
require 'json'
require './env' if File.exists?('env.rb')

before do
  puts ENV['RDIO_CLIENT_ID']
  puts ENV['RDIO_CLIENT_SECRET']
  @rdio = Rdio.new(ENV['RDIO_CLIENT_ID'], ENV['RDIO_CLIENT_SECRET'])
end

get '/' do
  redirect to('/index.html')
end

post '/rdio/:method' do
    @rdio.call(params[:method], JSON.parse(request.body.string)).to_json
end