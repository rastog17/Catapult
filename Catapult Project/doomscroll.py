import random

def doomscroll_feed(trials):

    # SAFE COPY (correct place)
    trials_copy = [trial.copy() for trial in trials]

    random.shuffle(trials_copy)

    for trial in trials_copy:
        trial["discovery_score"] = random.randint(60, 100)

    return sorted(
        trials_copy,
        key=lambda x: x["discovery_score"],
        reverse=True
    )
