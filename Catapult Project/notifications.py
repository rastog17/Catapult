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

# ----------------------------------
# TEST NOTIFICATIONS
# ----------------------------------
if __name__ == "__main__":

    print("Testing notifications...")

    add_notification("Heart Study Nearby")
    add_notification("Cancer Trial Recruiting")
    add_notification("New Clinical Trial Available")

    print("\nCurrent Notifications:")
    for n in get_notifications():
        print(n)

    print("\nNotification Count:", count_notifications())

    print("\nRemoving notification id=2...")
    remove_notification(2)

    print("\nAfter removal:")
    for n in get_notifications():
        print(n)