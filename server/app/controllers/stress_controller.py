# app/controllers/stress_controller.py
from flask import request, jsonify
from PIL import Image
import io
import base64

# Lazy-load the Hugging Face pipeline
pipe = None

def get_pipe():
    global pipe
    if pipe is None:
        from transformers import pipeline
        pipe = pipeline(
            "image-classification",
            model="HardlyHumans/Facial-expression-detection"
        )
    return pipe

# --- Emotion → Stress Mapping ---
def map_emotion_to_stress(emotion: str) -> str:
    stress_map = {
        "happy": "Low Stress",
        "neutral": "Low Stress",
        "sad": "Moderate Stress",
        "disgust": "Moderate Stress",
        "contempt": "Moderate Stress",
        "angry": "High Stress",
        "fear": "High Stress",
        "surprise": "High Stress"
    }
    return stress_map.get(emotion.lower(), "Unknown")

# --- Controller: Detect Stress from Uploaded Image ---
def stress_from_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    try:
        image = Image.open(file).convert("RGB")
    except Exception as e:
        return jsonify({"error": f"Invalid image file: {str(e)}"}), 400

    # Run inference
    pipe_instance = get_pipe()
    result = pipe_instance(image)
    top_emotion = result[0]["label"]
    stress_level = map_emotion_to_stress(top_emotion)

    return jsonify({
        "detected_emotion": top_emotion,
        "stress_level": stress_level
    })

# --- Controller: Detect Stress from Live Frame (Base64 from React) ---
def stress_from_live():
    """
    Receives a frame from frontend in base64 and returns detected emotion & stress level.
    Expected JSON payload: { "frame": "data:image/jpeg;base64,..." }
    """
    data = request.json
    if not data or "frame" not in data:
        return jsonify({"error": "No frame data provided"}), 400

    frame_data = data["frame"]

    # Remove base64 header if present
    if frame_data.startswith("data:image"):
        frame_data = frame_data.split(",")[1]

    try:
        image_bytes = base64.b64decode(frame_data)
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception as e:
        return jsonify({"error": f"Invalid image data: {str(e)}"}), 400

    # Run inference
    pipe_instance = get_pipe()
    result = pipe_instance(image)
    top_emotion = result[0]["label"]
    stress_level = map_emotion_to_stress(top_emotion)

    return jsonify({
        "detected_emotion": top_emotion,
        "stress_level": stress_level
    })
