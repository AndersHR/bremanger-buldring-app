"use client";

import {
  Boulder,
  BoulderGrade,
  BoulderGroup,
  BoulderGroupRaw,
  BoulderRaw,
  BoulderStart,
  BoulderStatus,
  ErrorWithMessage,
} from "@/lib/definitions";
import {
  createBoulder,
  getOrCreateBoulderGroup,
  updateBoulder,
} from "@/lib/supabase/data";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import BoulderGroupInput from "../ui/BoulderGroupInput";
import Button, { ButtonMode } from "../ui/Button";
import DateInput from "../ui/DateInput";
import NumberInput from "../ui/NumberInput";
import SelectInput from "../ui/SelectInput";
import TextInput from "../ui/TextInput";
import styles from "./boulder.module.css";

const DEFAULT_VALUE_GRADE = BoulderGrade.UBESTEMT;
const DEFAULT_VALUE_START = BoulderStart.STAND;
const DEFAULT_VALUE_STATUS = BoulderStatus.CLIMBED;

export default function BoulderForm({
  initialBoulder,
  initialBoulderGroup,
  mode,
}: {
  initialBoulder: Boulder | null;
  initialBoulderGroup: BoulderGroup | null;
  mode: "create" | "edit";
}) {
  const router = useRouter();

  const SingleBoulderMap = dynamic(
    () => import("@/components/kart/SingleBoulderMap"),
    { ssr: false }
  );

  function initializeBoulderFormData(boulder: Boulder | null): BoulderFormData {
    return {
      name: boulder?.name ?? "",
      boulder_group_id: boulder?.boulder_group_id ?? null,
      grade: boulder?.grade ?? DEFAULT_VALUE_GRADE,
      start: boulder?.start ?? DEFAULT_VALUE_START,
      status: boulder?.status ?? DEFAULT_VALUE_STATUS,
      first_ascender: boulder?.first_ascender ?? null,
      first_ascent: boulder?.first_ascent?.toLocaleDateString() ?? null,
      description: boulder?.description ?? "",
      latitude: boulder?.latitude ?? null,
      longitude: boulder?.longitude ?? null,
      image_base_url: boulder?.image_base_url ?? null,
      image_line_url: boulder?.image_line_url ?? null,
    };
  }

  const [formData, setFormData] = useState<BoulderFormData>(() =>
    initializeBoulderFormData(initialBoulder)
  );
  const [errors, setErrors] = useState<z.inferFlattenedErrors<
    typeof boulderFormSchema
  > | null>(null);

  const [boulderGroup, setBoulderGroup] = useState<
    | { boulderGroup: BoulderGroup; isNew: false }
    | { boulderGroup: BoulderGroupRaw; isNew: true }
    | null
  >(
    initialBoulderGroup
      ? { boulderGroup: initialBoulderGroup, isNew: false }
      : null
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const { data, success, error } = boulderFormSchema.safeParse(formData);

    if (!success) {
      setErrors(error.flatten());
      return;
    } else {
      setErrors(null);
    }

    // if a new bouldergroup is selected, create a new bouldergroup
    const getBoulderGroupId = async () => {
      if (boulderGroup?.isNew) {
        return await getOrCreateBoulderGroup(boulderGroup.boulderGroup);
      } else {
        return boulderGroup?.boulderGroup.id ?? null;
      }
    };

    try {
      const boulderGroupId: string | null = await getBoulderGroupId();

      const boulderRaw: BoulderRaw = {
        ...data,
        boulder_group_id: boulderGroupId,
        image_base_url: initialBoulder?.image_base_url ?? null,
        image_line_url: initialBoulder?.image_line_url ?? null,
      };

      if (mode === "create") {
        const newBoulderId = await createBoulder(boulderRaw);
        if (newBoulderId) {
          router.push(`/bulder/${newBoulderId}`);
        }
      } else {
        if (initialBoulder?.id) {
          await updateBoulder(initialBoulder.id, boulderRaw);
          router.push(`/bulder/${initialBoulder.id}`);
          router.refresh();
        } else {
          console.error("No boulder id found for update");
        }
      }
    } catch (error) {
      console.error("Error creating or updating boulder", error);
    }
  }

  function handleReset() {
    setFormData(initializeBoulderFormData(initialBoulder));
    setBoulderGroup(
      initialBoulderGroup
        ? { boulderGroup: initialBoulderGroup, isNew: false }
        : null
    );
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
      <BoulderGroupInput
        boulderGroup={boulderGroup?.boulderGroup ?? null}
        onBoulderGroupChange={setBoulderGroup}
      />
      <SelectInput
        label="Grad"
        value={formData.grade.toString()}
        values={Object.values(BoulderGrade)}
        onChange={(value) => {
          setFormData({ ...formData, grade: value as BoulderGrade });
        }}
        error={formatError(errors?.fieldErrors.grade)}
      />
      <SelectInput
        label="Start"
        value={formData.start.toString()}
        values={Object.values(BoulderStart)}
        onChange={(value) => {
          setFormData({ ...formData, start: value as BoulderStart });
        }}
        error={formatError(errors?.fieldErrors.start)}
      />
      <SelectInput
        label="Status"
        value={formData.status.toString()}
        values={Object.values(BoulderStatus)}
        onChange={(value) => {
          if (value === BoulderStatus.PROJECT) {
            setFormData({
              ...formData,
              status: value as BoulderStatus,
              first_ascender: initialBoulder?.first_ascender ?? null,
              first_ascent:
                initialBoulder?.first_ascent?.toLocaleDateString() ?? null,
            });
          } else {
            setFormData({ ...formData, status: value as BoulderStatus });
          }
        }}
        error={formatError(errors?.fieldErrors.status)}
      />
      {formData.status != BoulderStatus.PROJECT && (
        <div>
          <TextInput
            label="Førstebestiger"
            value={formData.first_ascender ?? ""}
            placeholder="Førstebestiger"
            onChange={(value) => {
              if (value.trim() === "") {
                setFormData({ ...formData, first_ascender: null });
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
                first_ascent: value,
              })
            }
            error={formatError(errors?.fieldErrors.first_ascent)}
          />
        </div>
      )}
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
          value={formData.longitude}
          onChange={(value) => setFormData({ ...formData, longitude: value })}
          error={formatError(errors?.fieldErrors.longitude)}
        />
        <NumberInput
          label="Breddegrad"
          placeholder="Breddegrad"
          value={formData.latitude}
          onChange={(value) => setFormData({ ...formData, latitude: value })}
          error={formatError(errors?.fieldErrors.latitude)}
        />
      </div>
      <div className={styles.boulderFormButtonWrapper}>
        <Button
          type="submit"
          text="Lagre"
          mode={ButtonMode.tertiary}
          onClick={() => handleSubmit}
          width="100%"
        />
        <Button
          type="button"
          text="Tilbakestill"
          mode={ButtonMode.primary}
          onClick={handleReset}
          width="100%"
        />
      </div>
      <SingleBoulderMap
        latitude={formData.latitude}
        longitude={formData.longitude}
        height="400px"
        width="100%"
        onClick={(e) => {
          setFormData({
            ...formData,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          });
        }}
      />
    </form>
  );
}

type BoulderFormData = {
  name: string;
  grade: BoulderGrade;
  description: string;
  boulder_group_id: string | null;
  start: BoulderStart;
  status: BoulderStatus;
  first_ascender: string | null;
  first_ascent: string | null;
  longitude: number | null;
  latitude: number | null;
  image_base_url: string | null;
  image_line_url: string | null;
};

const boulderFormSchema = z
  .object({
    name: z
      .string({ message: "Navn må være en streng" })
      .trim()
      .nonempty({ message: "Navn kan ikke være tomt" })
      .max(100, { message: "Navn kan ikke være lengre enn 100 tegn" }),
    boulder_group_id: z.string().nullable(),
    grade: z.nativeEnum(BoulderGrade, { message: "Ugyldig grad" }),
    start: z.nativeEnum(BoulderStart, { message: "Ugyldig starttype" }),
    status: z.nativeEnum(BoulderStatus, { message: "Ugyldig status" }),
    first_ascender: z.string().trim().nullable(),
    first_ascent: z
      .string()
      .trim()
      .transform((value) => (value === "" ? null : value))
      .nullable()
      .refine((value) => !value || !isNaN(Date.parse(value)), "Ugyldig dato")
      .transform((value) => (value ? new Date(value) : null)),
    description: z.string().trim(),
    longitude: z
      .number()
      .min(0, { message: "Lengdegrad må være mellom 0 til 180 grader" })
      .max(180, { message: "Lengdegrad må være mellom 0 til 180 grader" })
      .nullable(),
    latitude: z
      .number()
      .min(-90, { message: "Breddegrad må være mellom -90 til 90 grader" })
      .max(90, { message: "Breddegrad må være mellom -90 til 90 grader" })
      .nullable(),
  })
  .refine((data) => !data.longitude || data.latitude, {
    message: "Lengdegrad er satt men breddegrad mangler",
    path: ["latitude"],
  })
  .refine((data) => data.longitude || !data.latitude, {
    message: "Breddegrad er satt men lengdegrad mangler",
    path: ["longitude"],
  });

function formatError(errors?: string[]): ErrorWithMessage | undefined {
  if (errors && errors.length > 0) {
    return { error: true, message: errors.join(", ") };
  } else {
    return undefined;
  }
}

export const MemoizedBoulderForm = React.memo(BoulderForm);
