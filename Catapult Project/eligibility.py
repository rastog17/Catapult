def eligibility_score(patient):

    score = 0

    if patient["age"] >= 18:
        score += 40

    if patient["treatments"]:
        score += 30

    if patient["condition"]:
        score += 30

    return score