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

export type HealthCheckFormValues = Omit<HealthCheckEntryType, "id">;

interface Props {
  onSubmit: (values: HealthCheckFormValues) => void;
}

interface BaseErrors {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  healthCheckRating: string;
}

type Errors = Partial<BaseErrors>;

const HealthCheckForm: React.FC<Props> = ({ onSubmit }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "The correct date format is YYYY-MM-DD";
        const errors: Errors = {};

        const isValidDate = (date: string): boolean => {
          return /^\d{4}-\d{2}-\d{2}$/.test(date);
        };

        // check required fields are filled
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (!isValidDate(values.date)) {
          errors.date = dateError;
        }

        // allow only nums, letters, commas and periods for specialist and description
        const errMsgLettersNums =
          "Only nums, letters, commas or periods are allowed";
        if (/[^A-Za-z0-9.,]+/.test(values.description)) {
          errors.description = errMsgLettersNums;
        }

        if (/[^A-Za-z0-9.,]+/.test(values.specialist)) {
          errors.specialist = errMsgLettersNums;
        }

        // Min length for description
        if (values.description.length < 5) {
          errors.description = "Minimum length is 5 chars.";
        }

        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
          errors.healthCheckRating = "Must be a number 0-3";
        }

        return {};
        // return errors;
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

export default HealthCheckForm;
