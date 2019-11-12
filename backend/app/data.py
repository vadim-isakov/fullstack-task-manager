NEW_TASK = 0
PROGRESS_TASK = 1
COMPLETED_TASK = 2
ARCHIVED_TASK = 3

TASK_STATUSES = {
    NEW_TASK: {
        'name': 'new',
        'color': 'magenta',
        'superuser_required': False
    },
    PROGRESS_TASK: {
        'name': 'in progress',
        'color': 'orange',
        'superuser_required': False
    },
    COMPLETED_TASK: {
        'name': 'completed',
        'color': 'green',
        'superuser_required': False
    },
    ARCHIVED_TASK: {
        'name': 'archived',
        'color': 'blue',
        'superuser_required': True
    }
}