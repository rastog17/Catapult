def filter_trials(trials, status=None):

    if not status:
        return trials

    return [
        t for t in trials
        if t["status"] == status
    ]