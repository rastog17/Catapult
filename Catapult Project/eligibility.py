def parse_age(age_str):
    if not age_str:
        return 0
    return int(age_str.split()[0])


def eligibility_score(user, trial):

    score = 0

    min_age = parse_age(trial.get("min_age"))
    max_age = parse_age(trial.get("max_age"))

    if min_age <= user.get("age", 0) <= max_age:
        score += 40

    if user.get("condition") in trial.get("conditions", []):
        score += 30

    if user.get("treatments"):
        score += 30

    return score
