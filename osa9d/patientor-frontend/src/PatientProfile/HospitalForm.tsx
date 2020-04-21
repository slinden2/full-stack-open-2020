import React from "react";
import { HospitalEntryType } from "../types";
import { Formik, Field, Form } from "formik";
import { Button, Divider, Header } from "semantic-ui-react";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type HospitalFormValues = Omit<HospitalEntryType, "id">;

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
}

interface BaseErrors {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  discharge: {
    date?: string;
    criteria?: string;
  };
}

type Errors = Partial<BaseErrors>;

const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        discharge: {
          date: "",
          criteria: "",
        },
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

        if (!values.discharge.date) {
          errors.discharge = { ...errors.discharge, date: requiredError };
        }
        if (values.discharge.date && !isValidDate(values.discharge.date)) {
          errors.discharge = { ...errors.discharge, date: dateError };
        }
        if (!values.discharge.criteria) {
          errors.discharge = {
            ...errors.discharge,
            criteria: requiredError,
          };
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
            <Divider horizontal>
              <Header as="h4">Discharge</Header>
            </Divider>
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
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
