from jinja2 import Template


def render_task_link_html(task_url, task_id):
    task_link = '{}/{}'.format(task_url, task_id)
    return Template(
        '''Link to task: <span id="task_link">
            <a href="{{ task_link }}">{{ task_link }}</a>
        </span>'''
    ).render(task_link=task_link)

def render_task_id_html(task_id):
    return Template(
        '''Task id: <span id="task_id">
            {{ task_id }}
        </span>'''
    ).render(task_id=task_id)


def render_confirm_link_html(confirm_url, token):
    confirm_link = '{}/{}'.format(confirm_url, token)
    return Template(
        '''Confirmation link: <span id="confirm_link">
            <a href="{{ confirm_link }}">{{ confirm_link }}</a>
        </span>'''
    ).render(confirm_link=confirm_link)


def render_confirm_token_html(token):
    return Template(
        'Token: <span id="confirm_token">{{ confirm_token }}</span>'
    ).render(confirm_token=token)

