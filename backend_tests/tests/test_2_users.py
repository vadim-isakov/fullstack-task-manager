import requests

#####################################################################
###  User for fixture 'make_user_request' created in test_1_auth  ###
#####################################################################


#### /users/current ####
def test_unverif_get_current_user(make_request):
    response = make_request(requests.get, '/users/current')
    assert response.status_code == 401

def test_get_current_user(make_user_request, user_data):
    response = make_user_request(requests.get, '/users/current')
    assert response.status_code == 200
    res = response.json()
    assert res['email'] == user_data['email']
    assert res['is_superuser'] == False
########################


#### /users/ ####
def test_unverif_get_users(make_request):
    response = make_request(requests.get, '/users/')
    assert response.status_code == 401

def test_get_users(make_user_request, user_data):
    response = make_user_request(requests.get, '/users/')
    assert response.status_code == 200
    res = response.json()
    is_email_exist = False
    for user in res:
        if user['email'] == user_data['email']:
            is_email_exist = True
            break
    assert is_email_exist
########################

