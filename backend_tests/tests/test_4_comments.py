import requests, json

#####################################################################
###  User for fixture 'make_user_request' created in test_1_auth  ###
#####################################################################


comment_data = {
    'text': 'test_text',
    'task_id': 1
}


### [POST] /comment/   ###
def test_unverif_create_comment(make_request):
    response = make_request(requests.post, '/comments/', data=json.dumps({
        "task_id": comment_data['task_id'],
        "text": comment_data['text']
    }))
    assert response.status_code == 401

def test_create_comment(make_user_request):
    response = make_user_request(requests.post, '/comments/', data=json.dumps({
        "task_id": comment_data['task_id'],
        "text": comment_data['text']
    }))
    assert response.status_code == 201
    response_body = response.json()
    assert 'id' in response_body
    comment_data['id'] = response_body['id']

def test_create_comment_with_link(make_user_request):
    response = make_user_request(requests.post, '/comments/', data=json.dumps({
        "task_id": comment_data['task_id'],
        "text": comment_data['text'],
        "task_url": "https://www.test.com"
    }))
    assert response.status_code == 201
    response_body = response.json()
    assert 'id' in response_body
    comment_data['id'] = response_body['id']
#########################



### [GET] /comments/{task_id}   ###
def test_unverif_get_comments(make_request):
    response = make_request(requests.get, '/comments/{}'.format(comment_data['task_id']))
    assert response.status_code == 401

def test_get_comments(make_user_request):
    response = make_user_request(requests.get, '/comments/{}'.format(comment_data['task_id']))
    assert response.status_code == 200
    response_body = response.json()
    checking_comment_text = None
    for comment in response_body:
        if comment['id'] == comment_data['id']:
            checking_comment_text = comment['text']
            break
    assert checking_comment_text == comment_data['text']
####################################



### [DELETE] /comments/{task_id}   ###
def test_unverif_delete_comment(make_request):
    response = make_request(requests.delete, '/comments/{}'.format(comment_data['id']))
    assert response.status_code == 401

def test_user_delete_comment(make_user_request):
    response = make_user_request(requests.delete, '/comments/{}'.format(comment_data['id']))
    assert response.status_code == 401

def test_delete_comment(make_superuser_request):
    response = make_superuser_request(requests.delete, '/comments/{}'.format(comment_data['id']))
    assert response.status_code == 200
    response = make_superuser_request(requests.delete, '/comments/{}'.format(comment_data['id']))
    assert response.status_code == 404
####################################

