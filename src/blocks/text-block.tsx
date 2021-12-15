import React from "react";
import { BlockProps, useResponse } from "./common";

export default function TextBlock({ block, parent }: BlockProps) {
  const { payload, onPayloadChange } = useResponse({ key: block.key, parent });

  return (
    <div>
      <label htmlFor="">{block.title}</label>
      <input
        type="text"
        value={payload?.value || ""}
        onChange={(e) => onPayloadChange({ value: e.currentTarget.value })}
      />
    </div>
  );
}
