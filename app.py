from flask import Flask, jsonify, send_from_directory, request
import requests
import os

app = Flask(__name__, static_folder="frontend/dist", static_url_path="")

@app.route("/api/github-repos")
def get_github_repos():
    # Get query parameters from frontend
    search_query = request.args.get("q", "")
    language = request.args.get("language", "")
    
    # Build GitHub API query
    query_parts = []
    
    # Add search query if provided
    if search_query:
        query_parts.append(search_query)
    
    # Add language filter if provided
    if language:
        query_parts.append(f"language:{language}")
    
    # Default query if no search criteria provided
    if not query_parts:
        query_parts.append("created:2017-01-10")
    
    # Join query parts
    query = " ".join(query_parts)
    
    # GitHub API endpoint
    github_url = f"https://api.github.com/search/repositories?q={query}&sort=stars&order=desc&per_page=100"
    
    try:
        response = requests.get(github_url)
        response.raise_for_status()
        data = response.json()
        return jsonify(data)
    except requests.RequestException as e:
        print(f"Error fetching data from GitHub API: {e}")
        return jsonify({"error": str(e)}), 500

# Frontend routes
@app.route("/")
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