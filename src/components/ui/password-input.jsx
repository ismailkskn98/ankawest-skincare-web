"use client";

import { Eye, EyeSlash } from "@phosphor-icons/react";
import { forwardRef, useState } from "react";

const PasswordInput = forwardRef(function PasswordInput(
  {
    className = "form-control",
    disabled = false,
    id,
    visibilityLabel = "Şifreyi",
    ...inputProps
  },
  ref,
) {
  const [isVisible, setIsVisible] = useState(false);
  const buttonLabel = `${visibilityLabel} ${isVisible ? "gizle" : "göster"}`;
  const VisibilityIcon = isVisible ? EyeSlash : Eye;

  return (
    <div className="password-control">
      <input
        {...inputProps}
        autoCapitalize="none"
        autoCorrect="off"
        className={className}
        disabled={disabled}
        id={id}
        ref={ref}
        spellCheck={false}
        type={isVisible ? "text" : "password"}
      />
      <button
        className="password-toggle"
        type="button"
        onClick={() => setIsVisible((currentValue) => !currentValue)}
        disabled={disabled}
        aria-controls={id}
        aria-label={buttonLabel}
        title={buttonLabel}
      >
        <VisibilityIcon size={18} aria-hidden="true" />
      </button>
    </div>
  );
});

export default PasswordInput;
