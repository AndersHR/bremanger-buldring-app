import { ErrorWithMessage } from "@/lib/definitions";
import InputWrapper from "./InputWrapper";

export default function DateInput({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value?: string;
  onChange: (value: string | null) => void;
  error?: ErrorWithMessage;
}) {
  return (
    <InputWrapper label={label} error={error}>
      <input
        type="date"
        value={value ?? ""}
        onInput={(e) => {
          console.log(e.currentTarget.value);
          onChange(e.currentTarget.value || null);
        }}
      />
    </InputWrapper>
  );
}
