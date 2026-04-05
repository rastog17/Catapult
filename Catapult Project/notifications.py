notifications = []
next_id = 1


def add_notification(title):
    global next_id

    notifications.append({
        "id": next_id,
        "title": title
    })

    next_id += 1


def get_notifications():
    return notifications


def remove_notification(notification_id):
    global notifications
    notifications = [
        n for n in notifications
        if n["id"] != notification_id
    ]


def count_notifications():
    return len(notifications)
    print("\nAfter removal:")
    for n in get_notifications():
        print(n)
