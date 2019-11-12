from bs4 import BeautifulSoup
import random, string, os, requests, json


def random_string(len=10):
    return ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=len))

def get_last_message_soup(to):
    req_url = '{}/api/v2/search?kind=to&query={}&limit=1'.format(os.environ['MAILHOG_URL'], to)
    message_res = requests.get(req_url)
    message_data = json.loads(message_res.text)
    body = message_data['items'][0]['Content']['Body']
    return BeautifulSoup(body, "html.parser")