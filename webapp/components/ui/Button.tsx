import styles from "./ui.module.css";

export default function Button({
  text,
  type = "button",
  mode,
  disabled = false,
  onClick,
  height,
  width,
}: {
  text: string;
  type: "button" | "submit";
  mode: ButtonMode;
  disabled?: boolean;
  onClick: () => void;
  height?: string;
  width?: string;
}) {
  function getButtonColor() {
    if (disabled) {
      return "var(--button-disabled-color)";
    }
    switch (mode) {
      case ButtonMode.primary:
        return "var(--primary-color)";
      case ButtonMode.secondary:
        return "var(--secondary-color)";
      case ButtonMode.tertiary:
        return "var(--tertiary-color)";
      case ButtonMode.quinary:
        return "var(--quinary-color)";
    }
    console.log("error");
  }

  function getFontColor() {
    if (disabled) {
      return "var(--button-disabled-font-color)";
    }
    switch (mode) {
      case ButtonMode.primary:
        return "var(--secondary-color)";
      case ButtonMode.secondary:
        return "var(--primary-color)";
      case ButtonMode.tertiary:
        return "var(--primary-color)";
      case ButtonMode.quinary:
        return "var(--primary-color)";
    }
    console.log("error");
  }

  function getBorderColor() {
    if (disabled) {
      return "var(--button-disabled-font-color)";
    }
    switch (mode) {
      case ButtonMode.primary:
        return "var(--secondary-color)";
      case ButtonMode.secondary:
        return "var(--secondary-color)";
      case ButtonMode.tertiary:
        return "var(--tertiary-color)";
      case ButtonMode.quinary:
        return "var(--quinary-color)";
    }
    console.log("error");
  }

  return (
    <button
      type={type}
      className={styles.button}
      style={{
        height: height,
        width: width,
        backgroundColor: getButtonColor(),
        color: getFontColor(),
        borderColor: getBorderColor(),
        fontWeight:
          mode === ButtonMode.tertiary
            ? "var(--font-weight-bold)"
            : "var(--font-weight-regular)",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export enum ButtonMode {
  empty = "empty",
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
  quinary = "quinary",
}
