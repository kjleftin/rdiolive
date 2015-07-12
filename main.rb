#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require './rdio'
require './rdio_keys'
require 'json'

before do
  puts "rdio client id"
  puts RDIO_CLIENT_ID
  @rdio = Rdio.new(RDIO_CLIENT_ID, RDIO_CLIENT_SECRET)
end

get '/' do
  redirect to('/index.html')
end

post '/rdio/:method' do
    @rdio.call(params[:method], JSON.parse(request.body.string)).to_json
end