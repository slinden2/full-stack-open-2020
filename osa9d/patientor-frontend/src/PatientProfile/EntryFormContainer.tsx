import React from "react";
import { EntryType } from "../types";
import { Select } from "semantic-ui-react";
import HealthCheckForm, { HealthCheckFormValues } from "./HealthCheckForm";
import HospitalForm, { HospitalFormValues } from "./HospitalForm";
import OccupationalHealthcareForm, {
  OccupationalHealthcareFormValues,
} from "./OccupationalHealthcareForm";

export type EntryFormValues =
  | HealthCheckFormValues
  | HospitalFormValues
  | OccupationalHealthcareFormValues;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const EntryFormContainer: React.FC<Props> = ({ onSubmit }) => {
  const [formType, setFormType] = React.useState<EntryType | null>(null);

  const entryTypeArray = Object.entries(EntryType).map(entry => ({
    key: entry[0],
    value: entry[0],
    text: entry[1] as string,
  }));

  return (
    <div>
      <Select
        placeholder="Select entry type"
        options={entryTypeArray}
        onChange={(_, data) => {
          if (data.value && typeof data.value === "string") {
            setFormType(data.value as EntryType);
          }
        }}
      />
      {formType === "HealthCheck" && <HealthCheckForm onSubmit={onSubmit} />}
      {formType === "Hospital" && <HospitalForm onSubmit={onSubmit} />}
      {formType === "OccupationalHealthcare" && (
        <OccupationalHealthcareForm onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default EntryFormContainer;
