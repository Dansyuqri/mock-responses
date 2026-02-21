from mockeroo_mock_responses import get_available_codes, get_response


def test_known_code_returns_response():
    resp = get_response(200)
    assert resp is not None
    assert resp.status == 200
    assert resp.message


def test_unknown_code_returns_none():
    assert get_response(999) is None


def test_all_available_codes_return_responses():
    for code in get_available_codes():
        resp = get_response(code)
        assert resp is not None, f"get_response({code}) returned None but code is listed as available"
        assert resp.status == code
        assert resp.message, f"empty message for code {code}"


def test_available_codes_not_empty():
    assert len(get_available_codes()) > 0


def test_available_codes_are_sorted():
    codes = get_available_codes()
    assert codes == sorted(codes)


def test_available_codes_contains_expected():
    codes = set(get_available_codes())
    for expected in [200, 201, 204, 400, 401, 403, 404, 500]:
        assert expected in codes, f"expected code {expected} to be available"


def test_available_codes_returns_copy():
    codes1 = get_available_codes()
    codes2 = get_available_codes()
    original = codes2[0]
    codes1[0] = -1
    assert codes2[0] == original, "get_available_codes() should return an independent list each call"


def test_responses_are_varied():
    # 404 has 10+ messages; after 100 draws we expect more than one unique message.
    seen = {get_response(404).message for _ in range(100)}
    assert len(seen) > 1, "get_response(404) returned the same message 100 times — randomness may be broken"
