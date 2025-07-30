from flask import Flask, jsonify, send_from_directory
import requests
import os

app = Flask(__name__, static_folder="frontend/dist", static_url_path="")

@app.route("/api/github-repos")
def get_github_repos():
    external_url = "https://api.github.com/search/repositories?q=created:2017-01-10&sort=stars&order=desc"
    try:
        response = requests.get(external_url)
        response.raise_for_status()
        data = response.json()
        return jsonify(data)
    except requests.RequestException as e:
        print(f"Error fetching data from {external_url}: {e}")
        return jsonify({"error": str(e)}), 500

# Frontend routes
@app.route("/")
@app.route("/combined")
def serve_react():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_proxy(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=False)