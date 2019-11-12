import requests, json


#####################################################################
###  User for fixture 'make_user_request' created in test_1_auth  ###
#####################################################################


### /tasks/statuses ###
def test_get_statuses(make_user_request):
    response = make_user_request(requests.get, '/tasks/statuses')
    assert response.status_code == 200

def test_unverif_get_statuses(make_request):
    response = make_request(requests.get, '/tasks/statuses')
    assert response.status_code == 401
#######################


task_data = {
    'data': {
        "title": "test task",
        "description": "some description"
    }
}

### [POST] /tasks/ "Create task"  ###
def test_create_task(make_user_request, user_data):
    response = make_user_request(requests.post, '/tasks/', data=json.dumps(task_data['data']))
    assert response.status_code == 201
    response_body = response.json()
    assert 'task_id' in response_body
    task_data['id'] = response_body['task_id']
    

def test_unverif_create_task(make_request):
    response = make_request(requests.get, '/tasks/statuses')
    assert response.status_code == 401
#####################################



### [GET] /tasks/{id} "Read task"  ###
def test_read_nonexist(make_user_request):
    response = make_user_request(requests.get, '/tasks/{}'.format(999))
    assert response.status_code == 404

def test_read_task(make_user_request):
    response = make_user_request(requests.get, '/tasks/{}'.format(task_data['id']))
    assert response.status_code == 200
    response_body = response.json()
    assert response_body['title'] == task_data['data']['title']
    assert response_body['description'] == task_data['data']['description']

def test_unverif_read_task(make_request):
    response = make_request(requests.get, '/tasks/{}'.format(task_data['id']))
    assert response.status_code == 401
##################################


### [PUT] /tasks/{id} "Update task"  ###
def test_user_archive_task(make_user_request):
    response = make_user_request(
        requests.put,
        '/tasks/{}'.format(task_data['id']),
        data=json.dumps({"status_id": 3})
    )
    assert response.status_code == 401
    
def test_superuser_archive_task(make_superuser_request):
    response = make_superuser_request(
        requests.put,
        '/tasks/{}'.format(task_data['id']),
        data=json.dumps({"status_id": 3})
    )
    assert response.status_code == 200
    ##Checking updated data
    response = make_superuser_request(requests.get, '/tasks/{}'.format(task_data['id']))
    assert response.status_code == 200
    response_body = response.json()
    assert response_body['status_id'] == 3


def test_update_task(make_user_request):
    task_data['data'] = {
        "title": "new title",
        "description": "new description",
        "status_id": 2

    }
    response = make_user_request(
        requests.put,
        '/tasks/{}'.format(task_data['id']),
        data=json.dumps(task_data['data'])
    )
    assert response.status_code == 200
    ##Checking updated data
    response = make_user_request(requests.get, '/tasks/{}'.format(task_data['id']))
    assert response.status_code == 200
    response_body = response.json()
    assert response_body['title'] == task_data['data']['title']
    assert response_body['description'] == task_data['data']['description']
    assert response_body['status_id'] == task_data['data']['status_id']


def test_update_task_with_url(make_user_request):
    task_data['data'] = {
        "title": "new title",
        "description": "new description",
        "status_id": 1,
        "task_url": "https://www.test.com"

    }
    response = make_user_request(
        requests.put,
        '/tasks/{}'.format(task_data['id']),
        data=json.dumps(task_data['data'])
    )
    assert response.status_code == 200
####################################


### [GET] /tasks/ "Read tasks"  ###
def test_read_tasks(make_user_request):
    response = make_user_request(requests.get, '/tasks/')
    assert response.status_code == 200
    response_body = response.json()
    finded_tasks = [task for task in response_body if task['id'] == task_data['id']]
    assert finded_tasks[0]['title'] == task_data['data']['title']
    assert finded_tasks[0]['description'] == task_data['data']['description']
    
def test_unverif_get_tasks(make_request):
    response = make_request(requests.get, '/tasks/')
    assert response.status_code == 401
###################################
