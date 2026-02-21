# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/mockeroo_mock_responses'

class TestMockerooMockResponses < Minitest::Test
  def test_known_code_returns_response
    resp = MockerooMockResponses.get_response(200)
    refute_nil resp
    assert_equal 200, resp.status
    refute_empty resp.message
  end

  def test_unknown_code_returns_nil
    assert_nil MockerooMockResponses.get_response(999)
  end

  def test_all_available_codes_return_responses
    MockerooMockResponses.get_available_codes.each do |code|
      resp = MockerooMockResponses.get_response(code)
      refute_nil resp, "get_response(#{code}) returned nil but code is listed as available"
      assert_equal code, resp.status
      refute_empty resp.message, "empty message for code #{code}"
    end
  end

  def test_available_codes_not_empty
    refute_empty MockerooMockResponses.get_available_codes
  end

  def test_available_codes_are_sorted
    codes = MockerooMockResponses.get_available_codes
    assert_equal codes.sort, codes
  end

  def test_available_codes_contains_expected
    codes = MockerooMockResponses.get_available_codes
    [200, 201, 204, 400, 401, 403, 404, 500].each do |expected|
      assert_includes codes, expected
    end
  end

  def test_available_codes_returns_copy
    codes1 = MockerooMockResponses.get_available_codes
    codes2 = MockerooMockResponses.get_available_codes
    original = codes2[0]
    codes1[0] = -1
    assert_equal original, codes2[0],
                 'get_available_codes should return an independent array each call'
  end

  def test_responses_are_varied
    # 404 has 10+ messages; after 100 draws we expect more than one unique message.
    seen = 100.times.filter_map { MockerooMockResponses.get_response(404)&.message }.uniq
    assert seen.length > 1,
           'get_response(404) returned the same message 100 times — randomness may be broken'
  end
end
