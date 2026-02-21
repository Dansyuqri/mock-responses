# frozen_string_literal: true

require 'json'

# Sarcastic HTTP status code responses for testing and development.
#
# Mirrors the behaviour of the @mockeroo/mock-responses npm package.
#
# Example:
#
#   require 'mockeroo_mock_responses'
#
#   resp = MockerooMockResponses.get_response(404)
#   puts "#{resp.status}: #{resp.message}" if resp
#
#   codes = MockerooMockResponses.get_available_codes
#   puts codes.inspect  # [200, 201, 204, ...]
#
# Response data is loaded from the canonical responses/*.json files at require time.
module MockerooMockResponses
  # A response holding an HTTP status code and a randomly chosen sarcastic message.
  Response = Struct.new(:status, :message)

  # Load responses from the canonical ../responses/*.json files.
  # Falls back to a bundled `responses/` directory if present (for gem installs).
  def self._load_responses
    bundled  = File.expand_path('../../responses', __dir__)
    monorepo = File.expand_path('../../../responses', __dir__)
    dir = File.exist?(bundled) ? bundled : monorepo

    data = {}
    Dir.glob(File.join(dir, '*.json')).each do |file|
      code     = Integer(File.basename(file, '.json'))
      messages = JSON.parse(File.read(file, encoding: 'utf-8'))
      data[code] = messages unless messages.empty?
    end
    data
  end
  private_class_method :_load_responses

  RESPONSES = _load_responses.freeze
  CODES     = RESPONSES.keys.sort.freeze

  # Returns a Response with a random sarcastic message for the given HTTP
  # status code, or nil if the code is not recognised.
  def self.get_response(status_code)
    messages = RESPONSES[status_code.to_i]
    return nil unless messages

    Response.new(status_code.to_i, messages.sample)
  end

  # Returns all supported HTTP status codes in ascending order.
  # Each call returns a new array so callers may modify it freely.
  def self.get_available_codes
    CODES.dup
  end
end
