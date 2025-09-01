import os
from app import create_app

app = create_app()

if __name__ == "__main__":
    # Use the Render-provided port OR default to 5000 locally
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False)
