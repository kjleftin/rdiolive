#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require './rdio'
require 'json'

before do
  @rdio = Rdio.new(ENV['RDIO_CLIENT_ID'], ENV['RDIO_CLIENT_SECRET'])
end

get '/' do
  redirect to('/index.html')
end

post '/rdio/:method' do
    @rdio.call(params[:method], JSON.parse(request.body.string)).to_json
end