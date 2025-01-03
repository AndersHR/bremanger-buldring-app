import { ErrorWithMessage } from "@/lib/definitions";
import styles from "./ui.module.css";

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
    <div className={styles.textInput}>
      <label className={styles.inputLabel}>{label}</label>
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
      {error?.error && (
        <div className={styles.inputError}>{error?.message}</div>
      )}
    </div>
  );
}
