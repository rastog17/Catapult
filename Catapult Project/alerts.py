from geopy.distance import geodesic


def nearby_trials(user_loc, trials):

    alerts = []

    for trial in trials:
        for loc in trial["locations"]:
            if "geoPoint" not in loc:
                continue

            trial_loc = (
                loc["geoPoint"]["lat"],
                loc["geoPoint"]["lon"]
            )

            if geodesic(user_loc, trial_loc).miles < 50:
                alerts.append(trial)

    return alerts