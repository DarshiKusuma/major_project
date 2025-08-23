import React from "react";

export default function PasswordValidation({ password, confirmPassword }) {
  const rules = [
    { text: "First letter uppercase", valid: /^[A-Z]/.test(password) },
    { text: "At least 8 characters", valid: password.length >= 8 },
    { text: "Contains number", valid: /\d/.test(password) },
    { text: "Contains special char", valid: /[!@#$%^&*]/.test(password) },
    { 
      text: "Passwords match", 
      valid: password !== "" && confirmPassword !== "" && password === confirmPassword 
    }
  ];

  return (
    <ul className="text-sm mt-2">
      {rules.map((rule, i) => (
        <li key={i} className={`flex items-center ${rule.valid ? "text-green-400" : "text-red-400"}`}>
          {rule.valid ? "✔" : "✘"} {rule.text}
        </li>
      ))}
    </ul>
  );
}
