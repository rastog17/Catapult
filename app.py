from flask import Flask, request, jsonify
from flask_cors import CORS

from alerts import run_alert_check
from notifications import (
    get_notifications,
    add_notification,
    remove_notification,
    count_notifications
)

# -------------------------------------------------
# CREATE FLASK APP
# -------------------------------------------------
app = Flask(__name__)
CORS(app)


# -------------------------------------------------
# RUN ALERT CHECK (creates notifications)
# -------------------------------------------------
@app.route("/api/notifications/run", methods=["POST"])
def run_notifications():

    data = request.json

    lat = data.get("lat")
    lon = data.get("lon")
    condition = data.get("condition")

    if lat is None or lon is None:
        return {"error": "Missing user location"}, 400

    if not condition:
        return {"error": "Missing condition"}, 400

    user_location = (lat, lon)

    alerts = run_alert_check(condition, user_location)

    # store alerts as notifications
    for trial in alerts:
        add_notification(trial.get("title"))

    return {
        "alerts_created": len(alerts)
    }


# -------------------------------------------------
# GET ALL NOTIFICATIONS
# -------------------------------------------------
@app.route("/api/notifications")
def notifications():

    return jsonify({
        "count": count_notifications(),
        "notifications": get_notifications()
    })


# -------------------------------------------------
# DELETE NOTIFICATION (X button)
# -------------------------------------------------
@app.route("/api/notifications/<int:notification_id>", methods=["DELETE"])
def delete_notification(notification_id):

    remove_notification(notification_id)

    return {"success": True}


# -------------------------------------------------
# SERVER START
# -------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)