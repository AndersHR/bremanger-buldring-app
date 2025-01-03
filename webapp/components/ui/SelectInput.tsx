import styles from "./ui.module.css";

export default function SelectInput({
  label,
  values,
  defaultValue,
}: {
  label: string;
  values: string[];
  defaultValue?: string;
}) {
  return (
    <div className={styles.selectInput}>
      <label className={styles.inputLabel}>{label}</label>
      <select defaultValue={defaultValue}>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
