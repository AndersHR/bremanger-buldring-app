import styles from "./ui.module.css";
import { ErrorWithMessage } from "@/lib/definitions";

export default function InputWrapper({
  className = styles.boulderInput,
  children,
  label,
  error,
}: {
  className?: string;
  children: React.ReactNode;
  label: string;
  error?: ErrorWithMessage;
}) {
  return (
    <div className={className}>
      <label className={styles.inputLabel}>{label}</label>
      {children}
      {error?.error && (
        <div className={styles.inputError}>{error?.message}</div>
      )}
    </div>
  );
}
