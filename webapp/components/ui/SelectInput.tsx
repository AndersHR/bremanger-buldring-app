import { ErrorWithMessage } from "@/lib/definitions";
import InputWrapper from "./InputWrapper";

export default function SelectInput({
  label,
  value,
  values,
  onChange,
  error,
}: {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
  error?: ErrorWithMessage;
}) {
  return (
    <InputWrapper label={label} error={error}>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
}
