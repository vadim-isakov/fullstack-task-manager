from .utils import random_string, get_last_message_soup
import requests, json


def test_init_confirm_invalid_email(make_request):
    response = make_request(requests.post, '/auth/init-confirmation', data = json.dumps({
        'email': 'Ooops@',
        'password': random_string(),
        'username': random_string()
    }))
    assert response.status_code == 422

def test_init_confirm_two_times(make_request, user_data):
    for i in range(2):
        response = make_request(requests.post, '/auth/init-confirmation', data = json.dumps(user_data))
        assert response.status_code == 200


def test_auth(make_request, user_data, access_token):
    ## Init confirm and send mail
    response = make_request(requests.post, '/auth/init-confirmation', data = json.dumps(user_data))
    assert response.status_code == 200

    #Extract token from mail
    soup = get_last_message_soup(user_data['email'])
    confirm_token = soup.find("span", {"id": "confirm_token"}).text

    # Confirm user
    response = make_request(requests.put, '/auth/confirm', data = json.dumps({
        "confirm_token": confirm_token
    }))
    assert response.status_code == 200
    res = response.json()
    assert "access_token" in res
    access_token['token'] = res['access_token']

    ##Test token
    headers = {"Authorization": f"Bearer {res['access_token']}"}
    response = make_request(requests.get, '/auth/check', headers = headers)
    assert response.status_code == 200
    assert response.json()['is_token_valid'] == True



def test_auth_with_link(make_request, user_data, access_token):
    TEST_URL = 'http://www.test.com'
    USER_DATA = {
        "email": "{}@test.com".format(random_string()),
        "password": random_string(),
        "username": random_string(),
        "confirm_url": TEST_URL
    }

    ## Init confirm and send mail
    response = make_request(requests.post, '/auth/init-confirmation', data = json.dumps(USER_DATA))
    assert response.status_code == 200

    #Extract token from mail
    soup = get_last_message_soup(USER_DATA['email'])
    confirm_link = soup.find("span", {"id": "confirm_link"}).find('a').text
    confirm_token = confirm_link.split('/')[-1]

    # Confirm user
    response = make_request(requests.put, '/auth/confirm', data = json.dumps({
        "confirm_token": confirm_token
    }))
    assert response.status_code == 200
    res = response.json()
    assert "access_token" in res

    ##Test token
    headers = {"Authorization": f"Bearer {res['access_token']}"}
    response = make_request(requests.get, '/auth/check', headers = headers)
    assert response.status_code == 200
    assert response.json()['is_token_valid'] == True




def test_confirm_fake_token(make_request):
    response = make_request(requests.put, '/auth/confirm', data = json.dumps({
        "confirm_token": random_string()
    }))
    assert response.status_code == 401


def test_make_token_nonexist_user(make_request):
    response = make_request(requests.post, '/auth/token', data = {
        'username': random_string(),
        'password': random_string()
    })
    assert response.status_code == 401


def test_make_user_token(make_request, user_data):
    response =  make_request(requests.post, '/auth/token', data = {
        'username': user_data['username'],
        'password': user_data['password']
    })
    assert response.status_code == 200
    res = response.json()
    assert "access_token" in res
    ##Test token
    headers = {"Authorization": f"Bearer {res['access_token']}"}
    response = make_request(requests.get, '/auth/check', headers = headers)
    assert response.status_code == 200
    assert response.json()['is_token_valid'] == True


def test_make_superuser_token(superuser_token_response):
    assert superuser_token_response.status_code == 200
    assert "access_token" in superuser_token_response.json()


def test_unverif_check(make_request):
    headers = {"Authorization": f"Bearer {random_string()}"}
    response = make_request(requests.get, '/auth/check', headers = headers)
    assert response.status_code == 200
    assert response.json()['is_token_valid'] == False



