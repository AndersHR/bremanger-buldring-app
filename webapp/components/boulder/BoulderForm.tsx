"use client";

import {
  Boulder,
  BoulderGrade,
  BoulderGroup,
  BoulderGroupRaw,
  BoulderStart,
  ErrorWithMessage,
} from "@/lib/definitions";
import styles from "./boulder.module.css";
import { useState } from "react";
import TextInput from "../ui/TextInput";
import SelectInput from "../ui/SelectInput";
import BoulderGroupInput from "../ui/BoulderGroupInput";
import Button, { ButtonMode } from "../ui/Button";
import DateInput from "../ui/DateInput";
import { z } from "zod";
import NumberInput from "../ui/NumberInput";

const DEFAULT_VALUE_GRADE = BoulderGrade.UBESTEMT;
const DEFAULT_VALUE_START = BoulderStart.STAND;

export default function BoulderForm({
  boulder,
  mode,
}: {
  boulder?: Boulder;
  mode: "create" | "edit";
}) {
  const [formData, setFormData] = useState<BoulderFormData>({
    name: boulder?.name ?? "",
    boulder_group_id: boulder?.boulder_group_id ?? undefined,
    grade: boulder?.grade ?? DEFAULT_VALUE_GRADE,
    start: boulder?.start ?? DEFAULT_VALUE_START,
    description: boulder?.description ?? "",
    first_ascender: boulder?.first_ascender ?? undefined,
    first_ascent: boulder?.first_ascent?.toLocaleDateString() ?? undefined,
  });
  const [errors, setErrors] = useState<z.inferFlattenedErrors<
    typeof boulderFormSchema
  > | null>(null);

  const [boulderGroup, setBoulderGroup] = useState<
    BoulderGroup | BoulderGroupRaw | null
  >(null);

  function handleSubmit() {
    const { data, success, error } = boulderFormSchema.safeParse(formData);

    if (!success) {
      setErrors(error.flatten());
    } else {
      setErrors(null);
    }

    console.log("form", formData);
    console.log("errors", errors);
    console.log("navnerror", errors?.fieldErrors.name);
    console.log("Submit");
  }

  function handleReset() {
    console.table(formData);
  }

  return (
    <form className={styles.boulderForm} onSubmit={handleSubmit}>
      <TextInput
        label="Navn"
        value={formData.name}
        placeholder="Navn"
        onChange={(value) => setFormData({ ...formData, name: value })}
        error={formatError(errors?.fieldErrors.name)}
      />
      <BoulderGroupInput onBoulderGroupChange={setBoulderGroup} />
      <SelectInput
        label="Grad"
        values={Object.values(BoulderGrade)}
        defaultValue={boulder?.grade ?? DEFAULT_VALUE_GRADE}
      />
      <SelectInput
        label="Start"
        values={Object.values(BoulderStart)}
        defaultValue={boulder?.start ?? DEFAULT_VALUE_START}
      />
      <TextInput
        label="Førstebestiger"
        value={formData.first_ascender ?? ""}
        placeholder="Førstebestiger"
        onChange={(value) => {
          if (value.trim() === "") {
            setFormData({ ...formData, first_ascender: undefined });
          } else {
            setFormData({ ...formData, first_ascender: value });
          }
        }}
        error={formatError(errors?.fieldErrors.first_ascender)}
      />
      <DateInput
        label="Førstebestigning"
        value={formData.first_ascent ?? undefined}
        onChange={(value) =>
          setFormData({
            ...formData,
            first_ascent: value ?? undefined,
          })
        }
        error={formatError(errors?.fieldErrors.first_ascent)}
      />
      <TextInput
        type="textarea"
        label="Beskrivelse"
        value={formData.description}
        placeholder="Beskrivelse"
        onChange={(value) => setFormData({ ...formData, description: value })}
        error={formatError(errors?.fieldErrors.description)}
      />
      <div className={styles.boulderFromLatlongWrapper}>
        <NumberInput
          label="Lengdegrad"
          placeholder="Lengdegrad"
          value={boulder?.longitude ?? undefined}
          onChange={(value) => console.log(value)}
        />
        <NumberInput
          label="Breddegrad"
          placeholder="Breddegrad"
          value={boulder?.latitude ?? undefined}
          onChange={(value) => console.log(value)}
        />
      </div>
      <div className={styles.boulderFormButtonWrapper}>
        <Button
          type="submit"
          text="Lagre"
          mode={ButtonMode.tertiary}
          onClick={() => console.log("Lagre")}
          width="100%"
        />
        <Button
          type="button"
          text="Tilbakestill"
          mode={ButtonMode.primary}
          onClick={handleSubmit}
          width="100%"
        />
      </div>
    </form>
  );
}

type BoulderFormData = {
  name: string;
  grade: BoulderGrade;
  description: string;
  boulder_group_id?: string;
  start: BoulderStart;
  first_ascender?: string;
  first_ascent?: string;
};

const boulderFormSchema = z.object({
  name: z
    .string({ message: "Navn må være en streng" })
    .trim()
    .nonempty({ message: "Navn kan ikke være tomt" })
    .max(100, { message: "Navn kan ikke være lengre enn 100 tegn" }),
  grade: z.nativeEnum(BoulderGrade, { message: "Ugyldig grad" }),
  description: z.string().optional(),
  boulder_group_id: z.string().optional(),
  start: z.nativeEnum(BoulderStart, { message: "Ugyldig starttype" }),
  first_ascender: z.string().optional(),
  first_ascent: z
    .string()
    .optional()
    .refine((value) => !value || !isNaN(Date.parse(value)), "Ugyldig dato"),
});

function formatError(errors?: string[]): ErrorWithMessage | undefined {
  if (errors && errors.length > 0) {
    return { error: true, message: errors.join(", ") };
  } else {
    return undefined;
  }
}
