// src/components/InputField.jsx
import React from "react";

const InputField = ({ label, type = "text", value, onChange, options = [] }) => {
  return (
    <div className="flex flex-col mb-3 w-full">
      <label className="mb-1 text-gray-700 font-medium">{label}</label>

      {type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">اختر...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default InputField;