import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Input({
  type,
  className,
  placeholder,
  label,
  isPassword,
  name,
  onFocus,
  defaultValue,
}: any) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <label className="font-medium">{label}</label>
        <div className="flex items-center gap-3">
          <input
            className={`bg-SECONDARY rounded-lg px-2.5 py-1.5 outline-1 outline-QUATERNARY focus:ring-3 ring-QUATERNARY duration-300 ease-linear ${className}`}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            step={0.01}
            name={name}
            onFocus={onFocus}
            defaultValue={defaultValue}
          />
          {isPassword && (
            <div
              className="hover:cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="w-5.5 h-5.5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
