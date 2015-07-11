#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require './rdio'

before do
	@rdio = Rdio.new(["smmh8b7n8xh63x6mrnfgsfsy", "rCmswXQqQW"])
end

get '/' do
  redirect to('/index.html')
end

post '/rdio/:method' do
    @rdio.call(params[:method], JSON.parse(request.body.string)).to_json
end