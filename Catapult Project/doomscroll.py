import random


def doomscroll_feed(trials):

    random.shuffle(trials)

    for trial in trials:
        trial["discovery_score"] = random.randint(60, 100)

    return sorted(
        trials,
        key=lambda x: x["discovery_score"],
        reverse=True
    )