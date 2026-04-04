def match_score(patient, trial):

    score = 0

    if patient["condition"] in trial["conditions"]:
        score += 50

    if trial["status"] == "RECRUITING":
        score += 20

    if patient["age"] >= 18:
        score += 15

    if len(trial["locations"]) > 0:
        score += 15

    return min(score, 100)