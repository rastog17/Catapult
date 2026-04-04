from trials_api import search_trials
from matching import match_score
from doomscroll import doomscroll_feed
from filters import filter_trials

patient = {
    "age": 40,
    "condition": "diabetes",
    "treatments": ["insulin"],
    "location": "Indiana"
}

trials = search_trials(
    patient["condition"],
    patient["location"]
)

trials = filter_trials(trials, "RECRUITING")

for t in trials:
    t["match_score"] = match_score(patient, t)

feed = doomscroll_feed(trials)

for t in feed[:5]:
    print(t["title"], t["match_score"])