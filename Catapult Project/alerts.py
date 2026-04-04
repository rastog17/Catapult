def match_score(user, trial):

    score = 0

    if user.get("condition") in trial.get("conditions", []):
        score += 50

    if trial.get("status") == "RECRUITING":
        score += 20

    if trial.get("locations"):
        score += 30

    return min(score, 100)
