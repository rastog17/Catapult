from geopy.distance import geodesic


def nearby_trials(trials, user_loc):

    alerts = []

    for trial in trials:

        for loc in trial.get("locations", []):

            geo = loc.get("geoPoint")

            # skip if no coordinates exist
            if not geo:
                continue

            trial_loc = (
                geo.get("lat"),
                geo.get("lon")
            )

            if None in trial_loc:
                continue

            distance = geodesic(user_loc, trial_loc).miles

            if distance <= 50:
                alerts.append(trial)
                break

    return alerts
