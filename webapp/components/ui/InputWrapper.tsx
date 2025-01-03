import styles from "./ui.module.css";
import { ErrorWithMessage } from "@/lib/definitions";

export default function InputWrapper({
  children,
  label,
  error,
}: {
  children: React.ReactNode;
  label: string;
  error?: ErrorWithMessage;
}) {
  return (
    <div className={styles.textInput}>
      <label className={styles.inputLabel}>{label}</label>
      {children}
      {error?.error && (
        <div className={styles.inputError}>{error?.message}</div>
      )}
    </div>
  );
}
