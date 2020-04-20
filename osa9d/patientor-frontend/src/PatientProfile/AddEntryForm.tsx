import React from "react";
import { HealthCheckEntryType, HealthCheckRating } from "../types";
import { Formik, Field, Form } from "formik";
import { Button } from "semantic-ui-react";
import {
  TextField,
  DiagnosisSelection,
  NumberField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<HealthCheckEntryType, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        type: "HealthCheck",
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Health Check Rating (0-3)"
              placeholder="0-3"
              name="healthCheckRating"
              component={NumberField}
            />
            <Button type="submit" color="green" disabled={!dirty || !isValid}>
              Add
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
