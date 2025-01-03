import { BoulderGroup, BoulderGroupRaw } from "@/lib/definitions";
import { useState, useEffect } from "react";
import styles from "./ui.module.css";
import { fetchFilteredBoulderGroups } from "@/lib/supabase/data";
import IconButton from "./IconButton";

export default function BoulderGroupInput({
  onBoulderGroupChange,
}: {
  onBoulderGroupChange: (
    boulderGroup: BoulderGroup | BoulderGroupRaw | null
  ) => void;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedBoulderGroup, setSelectedBoulderGroup] =
    useState<BoulderGroup | null>(null);
  const [filteredBoulderGroups, setFilteredBoulderGroups] = useState<
    BoulderGroup[]
  >([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [createNew, setCreateNew] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setShowDropdown(false);
      setFilteredBoulderGroups([]);
      return;
    }

    const fetchFilteredBoulderGroupResults = async () => {
      const boulderGroups = await fetchFilteredBoulderGroups(inputValue);
      setFilteredBoulderGroups(boulderGroups);
      if (boulderGroups.length > 0 && selectedBoulderGroup === null) {
        setShowDropdown(true);
      }
    };

    const debounceFetch = setTimeout(fetchFilteredBoulderGroupResults, 300);

    console.log(filteredBoulderGroups);

    return () => clearTimeout(debounceFetch);
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (
      selectedBoulderGroup &&
      inputValue.trim().toLowerCase() !==
        selectedBoulderGroup.name.toLowerCase()
    ) {
      setSelectedBoulderGroup(null);
    }
  };

  const handleSelect = (boulderGroup: BoulderGroup) => {
    setInputValue(boulderGroup.name);
    setSelectedBoulderGroup(boulderGroup);
    setShowDropdown(false);

    onBoulderGroupChange(boulderGroup);
  };

  const handleSelectCreateNew = () => {
    setCreateNew(true);
    setShowDropdown(false);

    onBoulderGroupChange({
      name: inputValue.trim(),
    } as BoulderGroupRaw);
  };

  const handleCancelSelection = () => {
    setInputValue("");
    setCreateNew(false);
    setSelectedBoulderGroup(null);

    onBoulderGroupChange(null);
  };

  function boulderGroupIsSelected() {
    return selectedBoulderGroup || createNew;
  }

  function showCreateNewBoulderGroupOption() {
    return (
      inputValue.trim() !== "" &&
      !(
        filteredBoulderGroups.length === 1 &&
        filteredBoulderGroups[0].name.toLowerCase() ===
          inputValue.trim().toLowerCase()
      ) &&
      (filteredBoulderGroups.length === 0 || selectedBoulderGroup === null)
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
              icon="/icons8-close-96.png"
              ariaLabel="Fjern"
              type="tertiary"
              handleClick={handleCancelSelection}
              height="var(--font-size-md)"
              width="var(--font-size-md)"
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
    </div>
  );
}

const LabelCreateNew = ({ label }: { label: string }) => {
  return (
    <div className={styles.boulderGroupDropdownItemCreateNew}>{label}</div>
  );
};
