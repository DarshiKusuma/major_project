from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
# This file is used to run the Flask application.
# It creates an instance of the Flask application and runs it.