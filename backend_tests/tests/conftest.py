import pytest, requests, os
from .utils import random_string


def pytest_addoption(parser):
    parser.addoption('--limit', action='store', default=-1, type=int, help='tests limit')
    parser.addoption("--background", action="store_true", help="run background tests")

def pytest_configure(config):
    config.addinivalue_line("markers", "background: mark test as background to run")

def pytest_collection_modifyitems(config, items):
    if config.getoption("--background"):
        return
    skip_background = pytest.mark.skip(reason="need --background option to run")
    for item in items:
        if "background" in item.keywords:
            item.add_marker(skip_background)


@pytest.fixture(scope="session")
def make_request():
    def _make_request(func, url, data={}, headers={}):
        return func(os.environ['BACKEND_URL'] + url, data=data, headers=headers)
    return _make_request



@pytest.fixture(scope="session")
def superuser_token_response(make_request):
    return make_request(requests.post, '/auth/token', data = {
        'username': os.environ['SUPERUSER_USERNAME'],
        'password': os.environ['SUPERUSER_PASSWORD']
    })


@pytest.fixture(scope="session")
def make_superuser_request(superuser_token_response, make_request):
    access_token = superuser_token_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {access_token}"}
    def _make_superuser_request(func, url, data={}):
        return make_request(func, url, data=data, headers=headers)
    return _make_superuser_request



@pytest.fixture(scope="session")
def user_data():
    return {
        "email": "{}@test.com".format(random_string()),
        "password": random_string(),
        "username": random_string()
    }


@pytest.fixture(scope="session")
def access_token():
    return {'token': None}

##Fixture uses token received by 'test_make_user_token'
@pytest.fixture(scope="session")
def make_user_request(make_request, access_token):
    access_token = access_token.get('token')
    if not access_token:
        raise ValueError('Works only after test_make_user_token')
    headers = {"Authorization": f"Bearer {access_token}"}
    def _make_user_request(func, url, data={}):
        return make_request(func, url, data=data, headers=headers)
    return _make_user_request


