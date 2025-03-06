import { ErrorWithMessage } from "@/lib/definitions";
import InputWrapper from "./InputWrapper";

export default function TextInput({
  type = "text",
  label,
  value,
  placeholder,
  onChange,
  error,
}: {
  type?: "text" | "number" | "textarea";
  label: string;
  value?: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: ErrorWithMessage;
}) {
  return (
    <InputWrapper label={label} error={error}>
      {type === "textarea" ? (
        <textarea
          rows={5}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={
            error?.error
              ? {
                  borderColor: "var(--error-color)",
                }
              : {}
          }
        />
      ) : (
        <input
          type={"text"}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={
            error?.error
              ? {
                  borderColor: "var(--error-color)",
                }
              : {}
          }
        />
      )}
    </InputWrapper>
  );
}
