import {
  BoulderGroup,
  BoulderGroupRaw,
  ErrorWithMessage,
} from "@/lib/definitions";
import { fetchFilteredBoulderGroups } from "@/lib/supabase/data.client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import IconButton from "./IconButton";
import styles from "./ui.module.css";

export default function BoulderGroupInput({
  boulderGroup,
  onBoulderGroupChange,
  error,
}: {
  boulderGroup: BoulderGroup | BoulderGroupRaw | null;
  onBoulderGroupChange: (
    boulderGroup:
      | { boulderGroup: BoulderGroup; isNew: false }
      | { boulderGroup: BoulderGroupRaw; isNew: true }
      | null
  ) => void;
  error?: ErrorWithMessage;
}) {
  const [inputValue, setInputValue] = useState<string>(
    boulderGroup?.name ?? ""
  );
  const [filteredBoulderGroups, setFilteredBoulderGroups] = useState<
    BoulderGroup[]
  >([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [createNew, setCreateNew] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(boulderGroup?.name ?? "");
    setCreateNew(false);
  }, [boulderGroup]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setShowDropdown(false);
      setFilteredBoulderGroups([]);
      return;
    }

    const fetchFilteredBoulderGroupResults = async () => {
      const boulderGroups = await fetchFilteredBoulderGroups(inputValue);
      setFilteredBoulderGroups(boulderGroups);
      if (boulderGroups.length > 0 && boulderGroup === null) {
        setShowDropdown(true);
      }
    };

    const debounceFetch = setTimeout(fetchFilteredBoulderGroupResults, 300);

    return () => clearTimeout(debounceFetch);
  }, [inputValue, boulderGroup]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (
      boulderGroup &&
      inputValue.trim().toLowerCase() !== boulderGroup.name.toLowerCase()
    ) {
      onBoulderGroupChange(null);
    }
  };

  const handleSelect = (selectedBoulderGroup: BoulderGroup) => {
    setInputValue(selectedBoulderGroup.name);
    onBoulderGroupChange({
      boulderGroup: selectedBoulderGroup,
      isNew: false,
    });
    setShowDropdown(false);
  };

  const handleSelectCreateNew = () => {
    setCreateNew(true);
    setShowDropdown(false);

    onBoulderGroupChange({
      boulderGroup: {
        name: inputValue.trim(),
      } as BoulderGroupRaw,
      isNew: true,
    });
  };

  const handleCancelSelection = () => {
    setInputValue("");
    setCreateNew(false);

    onBoulderGroupChange(null);
  };

  function boulderGroupIsSelected() {
    return boulderGroup || createNew;
  }

  function showCreateNewBoulderGroupOption() {
    return (
      inputValue.trim() !== "" &&
      !(
        filteredBoulderGroups.length === 1 &&
        filteredBoulderGroups[0].name.toLowerCase() ===
          inputValue.trim().toLowerCase()
      ) &&
      (filteredBoulderGroups.length === 0 || boulderGroup === null)
    );
  }

  return (
    <div className={styles.boulderGroupInputWrapper}>
      <label className={styles.inputLabel}>Samling</label>
      <div className={styles.boulderGroupInput}>
        {boulderGroupIsSelected() ? (
          <div className={styles.boulderGroupSelectedInput}>
            <div
              className={styles.boulderGroupSelectedInputValue}
              style={createNew ? { fontWeight: "bold" } : {}}
            >
              {inputValue}
              {createNew && <LabelCreateNew label={"Ny!"} />}
            </div>
            <IconButton
              Icon={X}
              ariaLabel="Fjern"
              color="var(--tertiary-color)"
              onClick={handleCancelSelection}
              size={"24px"}
            />
          </div>
        ) : (
          <input
            type="text"
            placeholder="Søk etter samling"
            value={inputValue ?? ""}
            onChange={handleChange}
            onFocus={() => setShowDropdown(true)}
          />
        )}
      </div>
      {showDropdown && (
        <div className={styles.boulderGroupDropdown}>
          {filteredBoulderGroups.map((boulderGroup) => (
            <div
              key={boulderGroup.id}
              className={styles.boulderGroupDropdownItem}
              onClick={() => handleSelect(boulderGroup)}
            >
              {boulderGroup.name}
            </div>
          ))}
          {showCreateNewBoulderGroupOption() && (
            <div
              className={styles.boulderGroupDropdownItem}
              onClick={handleSelectCreateNew}
              style={createNew ? {} : { fontWeight: "bold" }}
            >
              {inputValue.trim()}
              <LabelCreateNew label={"Opprett ny!"} />
            </div>
          )}
        </div>
      )}
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
}

const LabelCreateNew = ({ label }: { label: string }) => {
  return (
    <div className={styles.boulderGroupDropdownItemCreateNew}>{label}</div>
  );
};
