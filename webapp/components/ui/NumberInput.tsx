import { ErrorWithMessage } from "@/lib/definitions";
import styles from "./ui.module.css";

export default function NumberInput({
  type = "text",
  label,
  value,
  placeholder,
  onChange,
  error,
}: {
  type?: "text" | "number" | "textarea";
  label: string;
  value?: number;
  placeholder: string;
  onChange: (value: string) => void;
  error?: ErrorWithMessage;
}) {
  return (
    <div className={styles.textInput}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        type={"number"}
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
      {error?.error && (
        <div className={styles.inputError}>{error?.message}</div>
      )}
    </div>
  );
}
