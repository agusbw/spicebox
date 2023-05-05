import React from "react";

export default function LineThroughText({ text, variant }) {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className="flex items-baseline">
      <input
        type="checkbox"
        defaultChecked={checked}
        className={`checkbox mr-2 text-white ${
          variant && "checkbox-" + variant
        } w-4 h-4`}
        onChange={() => setChecked(!checked)}
      />
      <p className={`${checked ? "line-through" : "no-underline"}`}>{text}</p>
    </div>
  );
}
