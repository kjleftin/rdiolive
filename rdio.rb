require 'net/http'
require 'uri'

# Connects to the Rdio API via OAuth2.0.
# Logged in user requests are not supported.
class Rdio

  TOKEN_ENDPOINT = 'https://services.rdio.com/oauth2/token'
  RESOURCE_ENDPOINT = 'https://services.rdio.com/api/1/'

  def initialize(clientId, clientSecret)
    @clientId = clientId
    @clientSecret = clientSecret
  end

  # Gets a client access token.
  # Returns the string access token
  def get_access_token()
    url = URI.parse(TOKEN_ENDPOINT)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    req = Net::HTTP::Post.new(url.path)
    req.basic_auth(@clientId, @clientSecret)
    req.set_form_data({'grant_type' => 'client_credentials'})
    res = http.request(req)
    JSON.parse(res.body)['access_token']
  end

  def call(method, params={})
    params = params.clone
    params['method'] = method
    params['access_token'] = get_access_token()
    
    url = URI.parse(RESOURCE_ENDPOINT)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    req = Net::HTTP::Post.new(url.path)
    req.set_form_data(params)
    res = http.request(req)
    JSON.parse(res.body)
  end
    
end