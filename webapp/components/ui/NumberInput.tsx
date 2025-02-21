import { ErrorWithMessage } from "@/lib/definitions";
import InputWrapper from "./InputWrapper";

export default function NumberInput({
  label,
  value,
  placeholder,
  onChange,
  error,
}: {
  label: string;
  value: number | null;
  placeholder: string;
  onChange: (value: number | null) => void;
  error?: ErrorWithMessage;
}) {
  function handleChange(value: string) {
    const parsedValue = parseFloat(value);
    if (value === "" || value === null) {
      onChange(null);
    }
    if (!isNaN(parsedValue)) {
      onChange(parsedValue);
    }
  }
  return (
    <InputWrapper label={label} error={error}>
      <input
        type={"number"}
        value={value ?? undefined}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        style={
          error?.error
            ? {
                borderColor: "var(--error-color)",
              }
            : {}
        }
      />
    </InputWrapper>
  );
}
