import time, requests, json, pytest
from .utils import get_last_message_soup


task_data = {'id': None}

@pytest.mark.background
def test_create_task_email(make_user_request, user_data):
    data = {
        "title": "test task",
        "description": "some description"
    }

    response = make_user_request(requests.post, '/tasks/', data=json.dumps(data))
    assert response.status_code == 201
    response_body = response.json()
    assert 'task_id' in response_body
    time.sleep(1)

    soup = get_last_message_soup(user_data['email'])
    task_id = int(soup.find("span", {"id": "task_id"}).text)
    assert task_id == response_body['task_id']
    task_data['id'] = task_id

@pytest.mark.background
def test_update_task_email(make_user_request, user_data):
    data = {
        "title": "new title",
        "description": "new description",
        "status_id": 2
    }
    response = make_user_request(requests.put, '/tasks/{}'.format(task_data['id']), data=json.dumps(data))
    assert response.status_code == 200
    response_body = response.json()
    assert 'task_id' in response_body
    time.sleep(1)

    soup = get_last_message_soup(user_data['email'])
    task_id = int(soup.find("span", {"id": "task_id"}).text)
    assert task_id == response_body['task_id']