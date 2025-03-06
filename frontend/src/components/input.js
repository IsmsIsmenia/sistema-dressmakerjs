import React from "react";

export function InputRoot({ error = false, ...props }) {
  return (
    <div
      data-error={error}
      className="group bg-gray-900 h-12 border border-gray-600 rounded-xl px-4 flex items-center gap-2 focus-within:border-gray-100 data-[error=true]:border-danger"
      {...props}
    />
  );
}

export function InputIcon({ children }) {
  return (
    <span className="text-green-600 group-focus-within:text-gray-100">
      {React.cloneElement(children, { className: "stroke-current" })}
    </span>
  );
}

export function InputField(props) {
  return <input className="flex-1 outline-0 placeholder-gray-400" {...props} />;
}

