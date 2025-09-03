import cv2
from PIL import Image
import numpy as np
from transformers import pipeline
from flask import request, jsonify

# Load Hugging Face model once
pipe = pipeline("image-classification", model="HardlyHumans/Facial-expression-detection")

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


# --- Controller: Image Upload Stress Detection ---
def stress_from_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    image = Image.open(file).convert("RGB")

    result = pipe(image)
    top_emotion = result[0]["label"]
    stress_level = map_emotion_to_stress(top_emotion)

    return jsonify({
        "detected_emotion": top_emotion,
        "stress_level": stress_level
    })


# --- Controller: Live Webcam Detection ---
def stress_from_live():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        return jsonify({"error": "Unable to access webcam"}), 500

    print("\n[VIDEO MODE] Press 'q' in console window to quit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        small_frame = cv2.resize(frame, (256, 256))
        rgb_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(rgb_frame)

        result = pipe(pil_image)
        top_emotion = result[0]["label"]
        stress_level = map_emotion_to_stress(top_emotion)

        display_text = f"{top_emotion} ({stress_level})"
        cv2.putText(frame, display_text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                    1, (0, 255, 0), 2, cv2.LINE_AA)

        cv2.imshow('Live Emotion & Stress Detection', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    return jsonify({"message": "Live detection finished"})