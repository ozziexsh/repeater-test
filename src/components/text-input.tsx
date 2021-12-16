import React from "react";

interface Props {
  label: string;
  value: string;
  onChange(newValue: string): void;
}

export default function TextInput({ label, value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}
