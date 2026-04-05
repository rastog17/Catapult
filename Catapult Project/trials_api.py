import requests

BASE_URL = "https://clinicaltrials.gov/api/v2/studies"


def search_trials(condition, location=None):
    params = {
        "query.cond": condition,
        "pageSize": 50,
    }

    if location:
        params["query.locn"] = location

    response = requests.get(BASE_URL, params=params, timeout=30)
    response.raise_for_status()

    data = response.json()
    trials = []

    for study in data.get("studies", []):

        protocol = study.get("protocolSection", {})

        identification = protocol.get("identificationModule", {})
        status = protocol.get("statusModule", {})
        conditions = protocol.get("conditionsModule", {})
        description = protocol.get("descriptionModule", {})
        contacts = protocol.get("contactsLocationsModule", {})
        eligibility = protocol.get("eligibilityModule", {})

        trials.append({
            "id": identification.get("nctId"),
            "title": identification.get("briefTitle", ""),
            "status": status.get("overallStatus", ""),
            "conditions": conditions.get("conditions", []),
            "summary": description.get("briefSummary", ""),

            # NEW IMPORTANT DATA
            "min_age": eligibility.get("minimumAge", "0 Years"),
            "max_age": eligibility.get("maximumAge", "120 Years"),

            "locations": contacts.get("locations", [])
        })

    return trials
